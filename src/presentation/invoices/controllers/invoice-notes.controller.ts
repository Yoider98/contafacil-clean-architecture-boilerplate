import {inject} from '@loopback/core';
import {repository, IsolationLevel} from '@loopback/repository';
import {
  post,
  get,
  param,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {ApiResponse} from '../../../shared/responses/api.response';
import {InvoiceNote, InvoiceNoteType} from '../../../domain/invoices/entities/invoice-note.entity';
import {InventoryRepository} from '../../../infrastructure/inventory/repositories/inventory.repository';
import {ProductRepository} from '../../../infrastructure/inventory/repositories/product.repository';
import {InvoiceNoteRepository} from '../../../infrastructure/invoices/repositories/invoice-note.repository';
import {InvoiceRepository} from '../../../infrastructure/invoices/repositories/invoice.repository';
import {AccountingPeriodRepository} from '../../../infrastructure/accounting/repositories/accounting-period.repository';
import {AccountRepository} from '../../../infrastructure/accounting/repositories/account.repository';
import {LedgerEntryRepository} from '../../../infrastructure/accounting/repositories/ledger-entry.repository';
import {PostgresDataSource} from '../../../infrastructure/database/datasources/postgres.datasource';
import {CreateInvoiceNoteUseCase} from '../../../application/invoices/use-cases/create-invoice-note.use-case';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function assertUuid(id: string, label = 'id'): void {
  if (!id || !UUID_REGEX.test(id)) {
    throw new HttpErrors.BadRequest(
      `Invalid ${label}: '${id}' is not a valid UUID`,
    );
  }
}

export interface EmitNoteRequestDto {
  companyId: string;
  noteType: InvoiceNoteType;
  concept: string; // Código Concepto DIAN: "1" = Devolución parcial, "2" = Anulación total
  items?: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export class InvoiceNotesController {
  constructor(
    @repository(InvoiceNoteRepository)
    private noteRepository: InvoiceNoteRepository,

    @repository(InvoiceRepository)
    private invoiceRepository: InvoiceRepository,

    @repository(AccountingPeriodRepository)
    private accountingPeriodRepository: AccountingPeriodRepository,

    @repository(AccountRepository)
    private accountRepository: AccountRepository,

    @repository(LedgerEntryRepository)
    private ledgerEntryRepository: LedgerEntryRepository,

    @repository(InventoryRepository)
    private inventoryRepository: InventoryRepository,

    @repository(ProductRepository)
    private productRepository: ProductRepository,

    @inject('currentUser')
    private currentUser: {id: string; email: string; role: string; roleInCompany: string},

    @inject('currentCompanyId')
    private currentCompanyId: string,

    @inject('datasources.postgres')
    private dataSource: PostgresDataSource,
  ) {}

  @post('/invoices/{id}/notes')
  @response(201, {
    description: 'Nota crédito/débito electrónica emitida ante la DIAN exitosamente',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async create(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['noteType', 'concept'],
            properties: {
              companyId: {type: 'string'},
              noteType: {type: 'string', enum: ['CREDIT', 'DEBIT']},
              concept: {type: 'string'},
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
            },
          },
        },
      },
    })
    dto: EmitNoteRequestDto,
  ): Promise<ApiResponse<InvoiceNote>> {
    assertUuid(id, 'id');
    
    // Inyectar automáticamente el ID de la empresa validada
    dto.companyId = this.currentCompanyId;

    // 2. Iniciar Transacción PostgreSQL P0
    const tx = await this.dataSource.beginTransaction(
      IsolationLevel.READ_COMMITTED,
    );
    const options = {transaction: tx};

    try {
      const useCase = new CreateInvoiceNoteUseCase(
        this.noteRepository,
        this.invoiceRepository,
        this.accountingPeriodRepository,
        this.accountRepository,
        this.ledgerEntryRepository,
        this.inventoryRepository,
        this.productRepository,
      );

      const createdNote = await useCase.execute(
        {
          ...dto,
          invoiceId: id,
        },
        options,
      );

      // 3. Confirmar transacción
      await tx.commit();

      const docLabel = dto.noteType === 'CREDIT' ? 'crédito' : 'débito';
      return ApiResponse.success(
        createdNote,
        `Nota ${docLabel} electrónica emitida y autorizada por la DIAN exitosamente. Consecutivo: ${createdNote.consecutive}`,
      );
    } catch (err: unknown) {
      // Revertir transacción ante fallos
      await tx.rollback();
      throw new HttpErrors.BadRequest(
        err instanceof Error ? err.message : 'Error al emitir nota electrónica',
      );
    }
  }

  @get('/invoices/{id}/notes')
  @response(200, {
    description: 'Consultar las notas asociadas a una factura',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async findByInvoice(
    @param.path.string('id') id: string,
    @param.query.string('companyId', {required: true}) companyId: string,
  ): Promise<ApiResponse<InvoiceNote[]>> {
    assertUuid(id, 'id');
    assertUuid(companyId, 'companyId');

    // Validar aislamiento multiempresa
    if (companyId !== this.currentCompanyId) {
      throw new HttpErrors.Forbidden('No tienes acceso autorizado a la empresa solicitada');
    }

    try {
      const list = await this.noteRepository.findByInvoice(id, companyId);
      return ApiResponse.success(list, 'Notas contables obtenidas exitosamente');
    } catch (err: unknown) {
      throw new HttpErrors.BadRequest(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
