import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  HttpErrors,
  param,
  post,
  put,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {CloseCashRegisterUseCase} from '../../../application/cash/use-cases/close-cash-register.use-case';
import {GetCashRegisterUseCase} from '../../../application/cash/use-cases/get-cash-register.use-case';
import {OpenCashRegisterUseCase} from '../../../application/cash/use-cases/open-cash-register.use-case';
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

export class CashRegisterController {
  constructor(
    @repository(CashRegisterRepository)
    private cashRegisterRepository: CashRegisterRepository,

    @repository(CashMovementRepository)
    private cashMovementRepository: CashMovementRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  // ------------------------------------------------------------------
  // POST /cash-registers — Abrir caja
  // ------------------------------------------------------------------
  @post('/cash-registers', {
    responses: {
      '201': {
        description: 'Caja abierta exitosamente',
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
  async open(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['companyId', 'openingBalance'],
            properties: {
              companyId: {type: 'string'},
              date: {
                type: 'string',
                description: 'YYYY-MM-DD. Por defecto: hoy',
              },
              openingBalance: {type: 'number', minimum: 0},
            },
          },
        },
      },
    })
    dto: {
      companyId: string;
      date?: string;
      openingBalance: number;
    },
  ): Promise<ApiResponse<unknown>> {
    const useCase = new OpenCashRegisterUseCase(this.cashRegisterRepository);
    try {
      this.responseObj.status(201);
      const result = await useCase.execute(dto);
      return ApiResponse.success(result, 'Caja abierta exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // ------------------------------------------------------------------
  // GET /cash-registers?companyId=&status= — Listar cajas
  // ------------------------------------------------------------------
  @get('/cash-registers')
  @response(200, {
    description: 'Lista de cajas',
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
    @param.query.string('companyId') companyId: string,
    @param.query.string('status') status?: string,
  ): Promise<ApiResponse<unknown[]>> {
    try {
      if (!companyId) {
        return ApiResponse.error('companyId is required');
      }
      const useCase = new GetCashRegisterUseCase(
        this.cashRegisterRepository,
        this.cashMovementRepository,
      );
      const registers = await useCase.findByCompany(companyId, status);
      return ApiResponse.success(registers, 'Cajas recuperadas exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // ------------------------------------------------------------------
  // GET /cash-registers/{id} — Detalle de caja con resumen
  // ------------------------------------------------------------------
  @get('/cash-registers/{id}')
  @response(200, {
    description: 'Detalle de la caja con resumen de movimientos',
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
  async findById(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<unknown>> {
    try {
      assertUuid(id);
      const useCase = new GetCashRegisterUseCase(
        this.cashRegisterRepository,
        this.cashMovementRepository,
      );
      const result = await useCase.execute(id);
      return ApiResponse.success(
        result,
        'Detalle de caja recuperado exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // ------------------------------------------------------------------
  // PUT /cash-registers/{id}/close — Cerrar caja
  // ------------------------------------------------------------------
  @put('/cash-registers/{id}/close')
  @response(200, {
    description: 'Caja cerrada con resumen',
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
  async close(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<unknown>> {
    try {
      assertUuid(id);
      const useCase = new CloseCashRegisterUseCase(
        this.cashRegisterRepository,
        this.cashMovementRepository,
      );
      const result = await useCase.execute(id);
      return ApiResponse.success(result, 'Caja cerrada exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
