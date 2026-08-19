import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  post,
  param,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {ReceivableRepository} from '../../../infrastructure/receivables/repositories/receivable.repository';
import {CreateReceivableUseCase} from '../../../application/receivables/use-cases/create-receivable.use-case';
import {ApplyPaymentToReceivableUseCase} from '../../../application/receivables/use-cases/apply-payment-receivable.use-case';
import {ReconcileReceivablesUseCase} from '../../../application/receivables/use-cases/reconcile-receivables.use-case';
import {ListReceivablesByCompanyUseCase} from '../../../application/receivables/use-cases/list-receivables-by-company.use-case';
import {GetReceivableStatementUseCase} from '../../../application/receivables/use-cases/get-receivable-statement.use-case';
import {GetReceivableAgingUseCase} from '../../../application/receivables/use-cases/get-receivable-aging.use-case';
import {ApiResponse} from '../../../shared/responses/api.response';

export class ReceivableController {
  constructor(
    @repository(ReceivableRepository)
    private receivableRepository: ReceivableRepository,
    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
    @inject('currentCompanyId')
    private currentCompanyId: string,
  ) {}

  @post('/receivables')
  @response(201, {description: 'Cuenta por cobrar creada'})
  async create(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['thirdPartyId', 'amount'],
            properties: {
              companyId: {type: 'string'},
              thirdPartyId: {type: 'string'},
              documentRef: {type: 'string'},
              amount: {type: 'number'},
              dueDate: {type: 'string', format: 'date'},
            },
          },
        },
      },
    })
    body: {
      companyId?: string;
      thirdPartyId: string;
      documentRef?: string;
      amount: number;
      dueDate?: string;
    },
  ) {
    try {
      this.responseObj.status(201);
      const useCase = new CreateReceivableUseCase(this.receivableRepository);
      const receivable = await useCase.execute({
        companyId: this.currentCompanyId,
        thirdPartyId: body.thirdPartyId,
        documentRef: body.documentRef,
        amount: body.amount,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      });
      return ApiResponse.success(receivable, 'Cuenta por cobrar creada');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @post('/receivables/{id}/payments')
  @response(200, {description: 'Pago aplicado a cuenta por cobrar'})
  async applyPayment(
    @param.path.string('id') id: string,
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['amount'],
            properties: {
              amount: {type: 'number'},
            },
          },
        },
      },
    })
    body: {amount: number},
  ) {
    try {
      const useCase = new ApplyPaymentToReceivableUseCase(
        this.receivableRepository,
      );
      const receivable = await useCase.execute(id, body.amount);
      return ApiResponse.success(receivable, 'Pago aplicado correctamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @post('/receivables/reconcile')
  @response(200, {description: 'Conciliación de cuentas por cobrar'})
  async reconcile(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['payments'],
            properties: {
              payments: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['receivableId', 'amount'],
                  properties: {
                    receivableId: {type: 'string'},
                    amount: {type: 'number'},
                  },
                },
              },
            },
          },
        },
      },
    })
    body: {
      payments: {receivableId: string; amount: number}[];
    },
  ) {
    try {
      const useCase = new ReconcileReceivablesUseCase(
        this.receivableRepository,
      );
      const receivables = await useCase.execute(body.payments);
      return ApiResponse.success(receivables, 'Conciliación completada');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/receivables')
  @response(200, {description: 'List receivables by company'})
  async listByCompany(@param.query.string('companyId') companyId: string) {
    try {
      const useCase = new ListReceivablesByCompanyUseCase(
        this.receivableRepository,
      );
      const receivables = await useCase.execute(companyId);
      return ApiResponse.success(receivables, 'Cuentas por cobrar recuperadas');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/receivables/statement')
  @response(200, {description: 'Obtiene el estado de cuenta por cliente'})
  async getStatement(
    @param.query.string('companyId') companyId: string,
    @param.query.string('thirdPartyId') thirdPartyId: string,
  ) {
    try {
      const useCase = new GetReceivableStatementUseCase(
        this.receivableRepository,
      );
      const statement = await useCase.execute(companyId, thirdPartyId);
      return ApiResponse.success(statement, 'Estado de cuenta recuperado');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/receivables/aging')
  @response(200, {description: 'Obtiene el reporte de vencimientos'})
  async getAgingReport(@param.query.string('companyId') companyId: string) {
    try {
      const useCase = new GetReceivableAgingUseCase(this.receivableRepository);
      const report = await useCase.execute(companyId);
      return ApiResponse.success(report, 'Reporte de vencimientos recuperado');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
