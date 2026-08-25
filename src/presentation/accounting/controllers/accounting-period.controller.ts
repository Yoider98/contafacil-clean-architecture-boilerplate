import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  post,
  get,
  put,
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
    @inject('currentCompanyId')
    private currentCompanyId: string,
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
            required: ['fromDate', 'toDate'],
            properties: {
              companyId: {type: 'string'},
              fromDate: {type: 'string', format: 'date-time'},
              toDate: {type: 'string', format: 'date-time'},
            },
          },
        },
      },
    })
    body: {
      companyId?: string;
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
        companyId: this.currentCompanyId,
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
  async getOpen(@param.query.string('companyId') companyId?: string) {
    try {
      const useCase = new GetOpenAccountingPeriodUseCase(
        this.accountingPeriodRepository,
      );
      const period = await useCase.execute(companyId || this.currentCompanyId);
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

  @get('/accounting-periods')
  @response(200, {
    description: 'Get all accounting periods for company',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {type: 'object'}},
          },
        },
      },
    },
  })
  async getAll(@param.query.string('companyId') companyId?: string) {
    try {
      const targetCompany = companyId || this.currentCompanyId;
      if (!targetCompany) return ApiResponse.error('companyId is required');
      const periods = await this.accountingPeriodRepository.findAllByCompany(targetCompany);
      return ApiResponse.success(periods, 'Periodos fiscales recuperados');
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(err instanceof Error ? err.message : String(err));
    }
  }

  @put('/accounting-periods/{id}')
  @response(200, {
    description: 'Update accounting period dates',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'object'},
          },
        },
      },
    },
  })
  async update(
    @param.path.string('id') id: string,
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['fromDate', 'toDate'],
            properties: {
              fromDate: {type: 'string', format: 'date-time'},
              toDate: {type: 'string', format: 'date-time'},
            },
          },
        },
      },
    })
    body: {fromDate: string; toDate: string},
  ) {
    try {
      const period = await this.accountingPeriodRepository.findById(id);
      if (!period) return ApiResponse.error('Periodo no encontrado');
      if (period.companyId !== this.currentCompanyId) {
        return ApiResponse.error('No autorizado');
      }

      period.fromDate = new Date(body.fromDate);
      period.toDate = new Date(body.toDate);
      period.updatedAt = new Date();

      const updated = await this.accountingPeriodRepository.save(period);
      return ApiResponse.success(updated, 'Periodo contable actualizado');
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(err instanceof Error ? err.message : String(err));
    }
  }
}
