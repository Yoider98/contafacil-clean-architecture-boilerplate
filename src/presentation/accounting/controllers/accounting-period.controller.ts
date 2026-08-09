import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  post,
  get,
  param,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {AccountingPeriodRepository} from '../../../infrastructure/accounting/repositories/accounting-period.repository';
import {ApiResponse} from '../../../shared/responses/api.response';
import {OpenAccountingPeriodUseCase} from '../../../application/accounting/use-cases/open-accounting-period.use-case';
import {GetOpenAccountingPeriodUseCase} from '../../../application/accounting/use-cases/get-open-accounting-period.use-case';
import {CloseAccountingPeriodUseCase} from '../../../application/accounting/use-cases/close-accounting-period.use-case';

export class AccountingPeriodController {
  constructor(
    @repository(AccountingPeriodRepository)
    private accountingPeriodRepository: AccountingPeriodRepository,
    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  @post('/accounting-periods')
  @response(201, {description: 'Accounting period opened'})
  async open(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['companyId', 'fromDate', 'toDate'],
            properties: {
              companyId: {type: 'string'},
              fromDate: {type: 'string', format: 'date'},
              toDate: {type: 'string', format: 'date'},
            },
          },
        },
      },
    })
    body: {
      companyId: string;
      fromDate: string;
      toDate: string;
    },
  ) {
    try {
      this.responseObj.status(201);
      const useCase = new OpenAccountingPeriodUseCase(
        this.accountingPeriodRepository,
      );
      const dto = {
        companyId: body.companyId,
        fromDate: new Date(body.fromDate),
        toDate: new Date(body.toDate),
      };
      const period = await useCase.execute(dto);
      return ApiResponse.success(period, 'Periodo contable abierto');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/accounting-periods/open')
  @response(200, {description: 'Get open accounting period for company'})
  async getOpen(@param.query.string('companyId') companyId: string) {
    try {
      const useCase = new GetOpenAccountingPeriodUseCase(
        this.accountingPeriodRepository,
      );
      const period = await useCase.execute(companyId);
      return ApiResponse.success(period, 'Periodo abierto recuperado');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @post('/accounting-periods/{id}/close')
  @response(200, {description: 'Close accounting period'})
  async close(@param.path.string('id') id: string) {
    try {
      const useCase = new CloseAccountingPeriodUseCase(
        this.accountingPeriodRepository,
      );
      const closed = await useCase.execute(id);
      return ApiResponse.success(closed, 'Periodo cerrado exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
