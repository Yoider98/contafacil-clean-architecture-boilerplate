import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  HttpErrors,
  param,
  post,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {RegisterCashMovementUseCase} from '../../../application/cash/use-cases/register-cash-movement.use-case';
import {GetCashMovementsUseCase} from '../../../application/cash/use-cases/get-cash-movements.use-case';
import {CashMovementType} from '../../../domain/cash/enums/cash-movement-type.enum';
import {CashRegisterRepository} from '../../../infrastructure/cash/repositories/cash-register.repository';
import {CashMovementRepository} from '../../../infrastructure/cash/repositories/cash-movement.repository';
import {ApiResponse} from '../../../shared/responses/api.response';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function assertUuid(id: string, label = 'id'): void {
  if (!id || !UUID_REGEX.test(id)) {
    throw new HttpErrors.BadRequest(
      `Invalid ${label}: '${id}' is not a valid UUID`,
    );
  }
}

export class CashMovementController {
  constructor(
    @repository(CashRegisterRepository)
    private cashRegisterRepository: CashRegisterRepository,

    @repository(CashMovementRepository)
    private cashMovementRepository: CashMovementRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  // ------------------------------------------------------------------
  // POST /cash-movements — Registrar un movimiento de caja
  // ------------------------------------------------------------------
  @post('/cash-movements', {
    responses: {
      '201': {
        description: 'Movimiento de caja registrado',
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
      },
    },
  })
  async create(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['cashRegisterId', 'type', 'amount'],
            properties: {
              cashRegisterId: {type: 'string'},
              type: {type: 'string', enum: ['IN', 'OUT']},
              amount: {type: 'number', minimum: 0.01},
              category: {type: 'string'},
              referenceType: {type: 'string'},
              referenceId: {type: 'string'},
            },
          },
        },
      },
    })
    dto: {
      cashRegisterId: string;
      type: CashMovementType;
      amount: number;
      category?: string;
      referenceType?: string;
      referenceId?: string;
    },
  ): Promise<ApiResponse<unknown>> {
    const useCase = new RegisterCashMovementUseCase(
      this.cashRegisterRepository,
      this.cashMovementRepository,
    );
    try {
      this.responseObj.status(201);
      const result = await useCase.execute(dto);
      return ApiResponse.success(
        result,
        'Movimiento de caja registrado exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // ------------------------------------------------------------------
  // GET /cash-movements?cashRegisterId= — Listar movimientos de una caja
  // ------------------------------------------------------------------
  @get('/cash-movements')
  @response(200, {
    description: 'Lista de movimientos de caja',
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
  async findAll(
    @param.query.string('cashRegisterId') cashRegisterId: string,
  ): Promise<ApiResponse<unknown[]>> {
    try {
      if (!cashRegisterId) {
        return ApiResponse.error('cashRegisterId is required');
      }
      assertUuid(cashRegisterId, 'cashRegisterId');
      const useCase = new GetCashMovementsUseCase(this.cashMovementRepository);
      const movements = await useCase.execute(cashRegisterId);
      return ApiResponse.success(
        movements,
        'Movimientos de caja recuperados exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
