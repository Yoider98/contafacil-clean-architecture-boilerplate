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
import {
  CreatePurchaseDto,
  CreatePurchaseUseCase,
} from '../../../application/purchases/use-cases/create-purchase.use-case';
import {Purchase} from '../../../domain/purchases/entities/purchase.entity';
import {PurchaseItem} from '../../../domain/purchases/entities/purchase-item.entity';
import {AccountRepository} from '../../../infrastructure/accounting/repositories/account.repository';
import {LedgerEntryRepository} from '../../../infrastructure/accounting/repositories/ledger-entry.repository';
import {InventoryRepository} from '../../../infrastructure/inventory/repositories/inventory.repository';
import {ProductRepository} from '../../../infrastructure/inventory/repositories/product.repository';
import {PurchaseItemRepository} from '../../../infrastructure/purchases/repositories/purchase-item.repository';
import {PurchaseRepository} from '../../../infrastructure/purchases/repositories/purchase.repository';
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

export class PurchasesController {
  constructor(
    @repository(PurchaseRepository)
    private purchaseRepository: PurchaseRepository,

    @repository(PurchaseItemRepository)
    private purchaseItemRepository: PurchaseItemRepository,

    @repository(InventoryRepository)
    private inventoryRepository: InventoryRepository,

    @repository(ProductRepository)
    private productRepository: ProductRepository,

    @repository(AccountRepository)
    private accountRepository: AccountRepository,

    @repository(LedgerEntryRepository)
    private ledgerEntryRepository: LedgerEntryRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  // POST /purchases — Crear compra + stock IN automático
  @post('/purchases', {
    responses: {
      '201': {
        description: 'Compra creada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': Purchase},
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
            required: ['companyId', 'items'],
            properties: {
              companyId: {type: 'string'},
              supplier: {type: 'string'},
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
    dto: CreatePurchaseDto,
  ): Promise<ApiResponse<Purchase>> {
    const useCase = new CreatePurchaseUseCase(
      this.inventoryRepository,
      this.purchaseRepository,
      this.purchaseItemRepository,
      this.productRepository,
      this.accountRepository,
      this.ledgerEntryRepository,
    );
    try {
      this.responseObj.status(201);
      const purchase = await useCase.execute(dto);
      return ApiResponse.success(purchase, 'Compra creada exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /purchases?companyId= — Listar compras de una empresa
  @get('/purchases')
  @response(200, {
    description: 'Lista de compras',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': Purchase}},
          },
        },
      },
    },
  })
  async findAll(
    @param.query.string('companyId') companyId: string,
  ): Promise<ApiResponse<Purchase[]>> {
    try {
      if (!companyId) {
        return ApiResponse.error('companyId is required');
      }
      const purchases = await this.purchaseRepository.findAll(companyId);
      return ApiResponse.success(purchases, 'Compras recuperadas exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /purchases/{id} — Detalle de una compra
  @get('/purchases/{id}')
  @response(200, {
    description: 'Detalle de la compra',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {'x-ts-type': Purchase},
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<Purchase>> {
    try {
      assertUuid(id);
      const purchase = await this.purchaseRepository.findById(id);
      return ApiResponse.success(purchase, 'Compra recuperada exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /purchases/{id}/items — Ítems de una compra
  @get('/purchases/{id}/items')
  @response(200, {
    description: 'Ítems de la compra',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': PurchaseItem}},
          },
        },
      },
    },
  })
  async findItems(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<PurchaseItem[]>> {
    try {
      assertUuid(id);
      const items = await this.purchaseItemRepository.findByPurchaseId(id);
      return ApiResponse.success(
        items,
        'Ítems de la compra recuperados exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
