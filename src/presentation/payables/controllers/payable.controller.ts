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
import {PayableRepository} from '../../../infrastructure/payables/repositories/payable.repository';
import {CreatePayableUseCase} from '../../../application/payables/use-cases/create-payable.use-case';
import {ApplyPaymentToPayableUseCase} from '../../../application/payables/use-cases/apply-payment-payable.use-case';
import {ReconcilePayablesUseCase} from '../../../application/payables/use-cases/reconcile-payables.use-case';
import {ListPayablesByCompanyUseCase} from '../../../application/payables/use-cases/list-payables-by-company.use-case';
import {GetPayableStatementUseCase} from '../../../application/payables/use-cases/get-payable-statement.use-case';
import {GetPayableAgingUseCase} from '../../../application/payables/use-cases/get-payable-aging.use-case';
import {ApiResponse} from '../../../shared/responses/api.response';

export class PayableController {
  constructor(
    @repository(PayableRepository)
    private payableRepository: PayableRepository,
    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  @post('/payables')
  @response(201, {description: 'Cuenta por pagar creada'})
  async create(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['companyId', 'thirdPartyId', 'amount'],
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
      companyId: string;
      thirdPartyId: string;
      documentRef?: string;
      amount: number;
      dueDate?: string;
    },
  ) {
    try {
      this.responseObj.status(201);
      const useCase = new CreatePayableUseCase(this.payableRepository);
      const payable = await useCase.execute({
        companyId: body.companyId,
        thirdPartyId: body.thirdPartyId,
        documentRef: body.documentRef,
        amount: body.amount,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      });
      return ApiResponse.success(payable, 'Cuenta por pagar creada');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @post('/payables/{id}/payments')
  @response(200, {description: 'Pago aplicado a cuenta por pagar'})
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
      const useCase = new ApplyPaymentToPayableUseCase(this.payableRepository);
      const payable = await useCase.execute(id, body.amount);
      return ApiResponse.success(payable, 'Pago aplicado correctamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @post('/payables/reconcile')
  @response(200, {description: 'Conciliación de cuentas por pagar'})
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
                  required: ['payableId', 'amount'],
                  properties: {
                    payableId: {type: 'string'},
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
      payments: {payableId: string; amount: number}[];
    },
  ) {
    try {
      const useCase = new ReconcilePayablesUseCase(this.payableRepository);
      const payables = await useCase.execute(body.payments);
      return ApiResponse.success(payables, 'Conciliación completada');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/payables')
  @response(200, {description: 'List payables by company'})
  async listByCompany(@param.query.string('companyId') companyId: string) {
    try {
      const useCase = new ListPayablesByCompanyUseCase(this.payableRepository);
      const payables = await useCase.execute(companyId);
      return ApiResponse.success(payables, 'Cuentas por pagar recuperadas');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/payables/statement')
  @response(200, {description: 'Obtiene el estado de cuenta por proveedor'})
  async getStatement(
    @param.query.string('companyId') companyId: string,
    @param.query.string('thirdPartyId') thirdPartyId: string,
  ) {
    try {
      const useCase = new GetPayableStatementUseCase(this.payableRepository);
      const statement = await useCase.execute(companyId, thirdPartyId);
      return ApiResponse.success(statement, 'Estado de cuenta recuperado');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/payables/aging')
  @response(200, {description: 'Obtiene el reporte de vencimientos'})
  async getAgingReport(@param.query.string('companyId') companyId: string) {
    try {
      const useCase = new GetPayableAgingUseCase(this.payableRepository);
      const report = await useCase.execute(companyId);
      return ApiResponse.success(report, 'Reporte de vencimientos recuperado');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
