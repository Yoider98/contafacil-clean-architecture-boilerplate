import {inject} from '@loopback/core';
import {repository, IsolationLevel} from '@loopback/repository';
import {
  post,
  get,
  param,
  requestBody,
  response,
  HttpErrors,
  RestBindings,
  Response,
} from '@loopback/rest';
import {InvoiceRepository} from '../../../infrastructure/invoices/repositories/invoice.repository';
import {InvoiceResolutionRepository} from '../../../infrastructure/invoices/repositories/invoice-resolution.repository';
import {CompanyRepository} from '../../../infrastructure/companies/repositories/company.repository';
import {ThirdPartyRepository} from '../../../infrastructure/third-parties/repositories/third-party.repository';
import {PostgresDataSource} from '../../../infrastructure/database/datasources/postgres.datasource';
import {
  CreateInvoiceUseCase,
  CreateInvoiceDTO,
} from '../../../application/invoices/use-cases/create-invoice.use-case';
import {IssueElectronicInvoiceUseCase} from '../../../application/invoices/use-cases/issue-electronic-invoice.use-case';
import {Invoice} from '../../../domain/invoices/entities/invoice.entity';
import {ApiResponse} from '../../../shared/responses/api.response';
import {InventoryRepository} from '../../../infrastructure/inventory/repositories/inventory.repository';
import {ProductRepository} from '../../../infrastructure/inventory/repositories/product.repository';
import {AccountRepository} from '../../../infrastructure/accounting/repositories/account.repository';
import {LedgerEntryRepository} from '../../../infrastructure/accounting/repositories/ledger-entry.repository';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function assertUuid(id: string, label = 'id'): void {
  if (!id || !UUID_REGEX.test(id)) {
    throw new HttpErrors.BadRequest(
      `Invalid ${label}: '${id}' is not a valid UUID`,
    );
  }
}

export interface EmitInvoiceRequestDto extends CreateInvoiceDTO {
  nitBuyer: string;
}

export class InvoiceController {
  constructor(
    @repository(InvoiceRepository)
    public invoiceRepository: InvoiceRepository,

    @repository(InvoiceResolutionRepository)
    public resolutionRepository: InvoiceResolutionRepository,

    @repository(CompanyRepository)
    public companyRepository: CompanyRepository,

    @repository(ThirdPartyRepository)
    public thirdPartyRepository: ThirdPartyRepository,

    @repository(InventoryRepository)
    public inventoryRepository: InventoryRepository,

    @repository(ProductRepository)
    public productRepository: ProductRepository,

    @repository(AccountRepository)
    public accountRepository: AccountRepository,

    @repository(LedgerEntryRepository)
    public ledgerEntryRepository: LedgerEntryRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,

    @inject('currentUser')
    private currentUser: {id: string; email: string; role: string; roleInCompany: string},

    @inject('currentCompanyId')
    private currentCompanyId: string,

    @inject('datasources.postgres')
    private dataSource: PostgresDataSource,
  ) {}

  @post('/invoices')
  @response(201, {
    description: 'Factura electrónica creada y emitida ante la DIAN exitosamente',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['nitBuyer', 'items'],
            properties: {
              companyId: {type: 'string'},
              nitBuyer: {type: 'string'},
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['description', 'quantity', 'unitPrice'],
                  properties: {
                    description: {type: 'string'},
                    quantity: {type: 'number'},
                    unitPrice: {type: 'number'},
                  },
                },
              },
              ivaPercent: {type: 'number'},
              reteFuentePercent: {type: 'number'},
              reteIVAPercent: {type: 'number'},
              reteICAPercent: {type: 'number'},
            },
          },
        },
      },
    })
    dto: EmitInvoiceRequestDto,
  ): Promise<ApiResponse<Invoice>> {
    // Inyectar automáticamente el ID de la empresa validada
    dto.companyId = this.currentCompanyId;

    if (!dto.items || dto.items.length === 0) {
      throw new HttpErrors.BadRequest('La factura debe tener al menos un ítem');
    }

    // 2. Iniciar Transacción PostgreSQL P0
    const tx = await this.dataSource.beginTransaction(
      IsolationLevel.READ_COMMITTED,
    );
    const options = {transaction: tx};

    try {
      // 3. Crear factura reservando consecutivo y validando la resolución activa
      const createUseCase = new CreateInvoiceUseCase(
        this.invoiceRepository,
        this.resolutionRepository,
      );
      const invoiceDraft = await createUseCase.execute(dto, options);

      // 4. Transmitir de forma integrada a la DIAN (XML, CUFE, QR)
      const issueUseCase = new IssueElectronicInvoiceUseCase(
        this.invoiceRepository,
        this.companyRepository,
        this.thirdPartyRepository,
        undefined,
        this.inventoryRepository,
        this.productRepository,
        this.accountRepository,
        this.ledgerEntryRepository,
      );
      const emittedInvoice = await issueUseCase.execute(
        invoiceDraft.id,
        dto.nitBuyer,
        options,
      );

      // 5. Confirmar transacción
      await tx.commit();

      const message = emittedInvoice.resolutionWarning
        ? `Factura emitida exitosamente. ${emittedInvoice.resolutionWarning}`
        : 'Factura electrónica emitida ante la DIAN exitosamente';

      return ApiResponse.success(emittedInvoice, message);
    } catch (err: unknown) {
      await tx.rollback();
      throw new HttpErrors.BadRequest(
        err instanceof Error ? err.message : 'Error al emitir factura electrónica',
      );
    }
  }

  @post('/invoices/{id}/issue-dian')
  @response(200, {description: 'Factura emitida electrónicamente a la DIAN'})
  async issueDian(
    @param.path.string('id') id: string,
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['nitBuyer'],
            properties: {
              nitBuyer: {type: 'string'},
            },
          },
        },
      },
    })
    body: {nitBuyer: string},
  ) {
    assertUuid(id, 'id');
    try {
      const useCase = new IssueElectronicInvoiceUseCase(
        this.invoiceRepository,
        this.companyRepository,
        this.thirdPartyRepository,
        undefined,
        this.inventoryRepository,
        this.productRepository,
        this.accountRepository,
        this.ledgerEntryRepository,
      );
      const issued = await useCase.execute(id, body.nitBuyer);
      return ApiResponse.success(
        issued,
        'Factura emitida a la DIAN exitosamente',
      );
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/invoices')
  @response(200, {
    description: 'Listado de facturas de la empresa',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async find(@param.query.string('companyId', {required: true}) companyId: string) {
    assertUuid(companyId, 'companyId');
    // Validar aislamiento multiempresa
    if (companyId !== this.currentCompanyId) {
      throw new HttpErrors.Forbidden('No tienes acceso autorizado a la empresa solicitada');
    }

    try {
      const list = await this.invoiceRepository.findByCompany(companyId);
      return ApiResponse.success(list, 'Facturas obtenidas exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(400);
      return ApiResponse.error(err instanceof Error ? err.message : String(err));
    }
  }

  @get('/invoices/{id}')
  @response(200, {
    description: 'Consultar detalle de factura',
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.string('companyId', {required: true}) companyId: string,
  ): Promise<ApiResponse<Invoice>> {
    assertUuid(id, 'id');
    assertUuid(companyId, 'companyId');

    if (companyId !== this.currentCompanyId) {
      throw new HttpErrors.Forbidden('No tienes acceso autorizado a la empresa solicitada');
    }

    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice || invoice.companyId !== companyId) {
      throw new HttpErrors.NotFound('Factura no encontrada para esta empresa');
    }

    return ApiResponse.success(invoice, 'Factura obtenida exitosamente');
  }
}
