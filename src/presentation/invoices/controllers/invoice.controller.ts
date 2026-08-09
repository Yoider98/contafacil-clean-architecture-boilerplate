import {post, get, requestBody, response, param} from '@loopback/rest';
import {inject} from '@loopback/core';
import {InvoiceRepository} from '../../../infrastructure/invoices/repositories/invoice.repository';
import {
  CreateInvoiceUseCase,
  CreateInvoiceDTO,
} from '../../../application/invoices/use-cases/create-invoice.use-case';
import {InvoiceModel} from '../../../infrastructure/invoices/models/invoice.model';
import {InvoiceItem} from '../../../domain/invoices/entities/invoice.entity';
import {ApiResponse} from '../../../shared/responses/api.response';
import {RestBindings, Response} from '@loopback/rest';
import {CompanyRepository} from '../../../infrastructure/companies/repositories/company.repository';
import {ThirdPartyRepository} from '../../../infrastructure/third-parties/repositories/third-party.repository';
import {IssueElectronicInvoiceUseCase} from '../../../application/invoices/use-cases/issue-electronic-invoice.use-case';

export class InvoiceController {
  constructor(
    @inject('repositories.InvoiceRepository')
    public invoiceRepository: InvoiceRepository,
    @inject('repositories.CompanyRepository')
    public companyRepository: CompanyRepository,
    @inject('repositories.ThirdPartyRepository')
    public thirdPartyRepository: ThirdPartyRepository,
    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  @post('/invoices')
  @response(201, {description: 'Factura creada'})
  async create(@requestBody() data: Omit<InvoiceModel, 'id'>) {
    try {
      if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
        throw new Error('La factura debe tener al menos un ítem');
      }
      const useCase = new CreateInvoiceUseCase(this.invoiceRepository);
      const dto: CreateInvoiceDTO = {
        companyId: data.companyId,
        items: data.items as unknown as InvoiceItem[],
        ivaPercent: undefined,
      };
      const created = await useCase.execute(dto);
      return ApiResponse.success(created, 'Factura creada exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(err instanceof Error ? err.message : String(err));
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
    try {
      const useCase = new IssueElectronicInvoiceUseCase(
        this.invoiceRepository,
        this.companyRepository,
        this.thirdPartyRepository,
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
    try {
      const list = await this.invoiceRepository.findByCompany(companyId);
      return ApiResponse.success(list, 'Facturas obtenidas exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(400);
      return ApiResponse.error(err instanceof Error ? err.message : String(err));
    }
  }
}
