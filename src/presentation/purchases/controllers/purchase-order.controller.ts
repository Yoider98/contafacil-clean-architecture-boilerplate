import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors,
  get,
  param,
  post,
  patch,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {
  CreatePurchaseOrderDto,
  CreatePurchaseOrderUseCase,
} from '../../../application/purchases/use-cases/create-purchase-order.use-case';
import {PurchaseOrder} from '../../../domain/purchases/entities/purchase-order.entity';
import {PurchaseOrderItem} from '../../../domain/purchases/entities/purchase-order-item.entity';
import {PurchaseOrderRepository} from '../../../infrastructure/purchases/repositories/purchase-order.repository';
import {PurchaseOrderItemRepository} from '../../../infrastructure/purchases/repositories/purchase-order-item.repository';
import {MasterlistRepository} from '../../../infrastructure/shared/repositories/masterlist.repository';
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

export class PurchaseOrderController {
  constructor(
    @repository(PurchaseOrderRepository)
    private purchaseOrderRepository: PurchaseOrderRepository,

    @repository(PurchaseOrderItemRepository)
    private purchaseOrderItemRepository: PurchaseOrderItemRepository,

    @repository(MasterlistRepository)
    private masterlistRepository: MasterlistRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,

    @inject('currentCompanyId')
    private currentCompanyId: string,
  ) {}

  // POST /purchase-orders — Crear orden de compra
  @post('/purchase-orders', {
    responses: {
      '201': {
        description: 'Orden de compra creada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': PurchaseOrder},
              },
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      description: 'Datos de la orden de compra a crear',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['items'],
            properties: {
              supplier: {type: 'string'},
              notes: {type: 'string'},
              expectedDeliveryDate: {type: 'string'},
              items: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'object',
                  required: ['productId', 'quantity', 'cost', 'warehouseId'],
                  properties: {
                    productId: {type: 'string'},
                    quantity: {type: 'number', minimum: 1},
                    cost: {type: 'number', minimum: 0},
                    warehouseId: {type: 'string'},
                  },
                },
              },
            },
          },
        },
      },
    })
    dto: CreatePurchaseOrderDto,
  ): Promise<ApiResponse<PurchaseOrder>> {
    dto.companyId = this.currentCompanyId;

    const useCase = new CreatePurchaseOrderUseCase(
      this.purchaseOrderRepository,
      this.purchaseOrderItemRepository,
      this.masterlistRepository,
    );

    try {
      this.responseObj.status(201);
      const purchaseOrder = await useCase.execute(dto);
      return ApiResponse.success(purchaseOrder, 'Orden de compra creada exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /purchase-orders — Listar órdenes de la empresa
  @get('/purchase-orders')
  @response(200, {
    description: 'Lista de órdenes de compra',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': PurchaseOrder}},
          },
        },
      },
    },
  })
  async findAll(): Promise<ApiResponse<PurchaseOrder[]>> {
    const orders = await this.purchaseOrderRepository.findAll(this.currentCompanyId);
    return ApiResponse.success(orders, 'Órdenes de compra recuperadas exitosamente');
  }

  // GET /purchase-orders/{id} — Detalle de orden de compra
  @get('/purchase-orders/{id}')
  @response(200, {
    description: 'Detalle de la orden de compra',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {'x-ts-type': PurchaseOrder},
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<PurchaseOrder>> {
    try {
      assertUuid(id);
      const order = await this.purchaseOrderRepository.findById(id);

      if (order.companyId !== this.currentCompanyId) {
        throw new HttpErrors.Forbidden('No tienes permiso para acceder a esta orden de compra');
      }

      return ApiResponse.success(order, 'Orden de compra recuperada exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(
        err instanceof HttpErrors.HttpError ? err.statusCode : 422,
      );
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /purchase-orders/{id}/items — Ítems de la orden de compra
  @get('/purchase-orders/{id}/items')
  @response(200, {
    description: 'Ítems de la orden de compra',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': PurchaseOrderItem}},
          },
        },
      },
    },
  })
  async findItems(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<PurchaseOrderItem[]>> {
    try {
      assertUuid(id);
      const order = await this.purchaseOrderRepository.findById(id);

      if (order.companyId !== this.currentCompanyId) {
        throw new HttpErrors.Forbidden(
          'No tienes permiso para acceder a los ítems de esta orden de compra',
        );
      }

      const items = await this.purchaseOrderItemRepository.findByPurchaseOrderId(id);
      return ApiResponse.success(
        items,
        'Ítems de la orden de compra recuperados exitosamente',
      );
    } catch (err: unknown) {
      this.responseObj.status(
        err instanceof HttpErrors.HttpError ? err.statusCode : 422,
      );
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // PATCH /purchase-orders/{id} — Actualizar orden de compra
  @patch('/purchase-orders/{id}')
  @response(200, {
    description: 'Orden de compra actualizada',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
          },
        },
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {type: 'string'},
              notes: {type: 'string'},
            },
          },
        },
      },
    })
    body: {status?: string; notes?: string},
  ): Promise<ApiResponse<void>> {
    try {
      assertUuid(id);
      const order = await this.purchaseOrderRepository.findById(id);
      if (order.companyId !== this.currentCompanyId) {
        throw new HttpErrors.Forbidden('No tienes permiso para actualizar esta orden');
      }

      if (body.status) order.status = body.status;
      if (body.notes !== undefined) order.notes = body.notes;

      await this.purchaseOrderRepository.update(order);
      return ApiResponse.success(undefined, 'Orden de compra actualizada exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(
        err instanceof HttpErrors.HttpError ? err.statusCode : 422,
      );
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
