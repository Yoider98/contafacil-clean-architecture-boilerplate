import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  param,
  post,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {GetStockUseCase} from '../../../application/inventory/use-cases/get-stock.use-case';
import {RegisterMovementUseCase} from '../../../application/inventory/use-cases/register-movement.use-case';
import {InventoryMovement} from '../../../domain/inventory/entities/inventory-movement.entity';
import {AccountRepository} from '../../../infrastructure/accounting/repositories/account.repository';
import {LedgerEntryRepository} from '../../../infrastructure/accounting/repositories/ledger-entry.repository';
import {InventoryRepository} from '../../../infrastructure/inventory/repositories/inventory.repository';
import {ProductRepository} from '../../../infrastructure/inventory/repositories/product.repository';
import {WarehouseRepository} from '../../../infrastructure/inventory/repositories/warehouse.repository';
import {UserRepository} from '../../../infrastructure/users/repositories/user.repository';
import {ApiResponse} from '../../../shared/responses/api.response';

export class InventoryController {
  constructor(
    @repository(InventoryRepository)
    private inventoryRepository: InventoryRepository,
    @repository(ProductRepository)
    private productRepository: ProductRepository,
    @repository(WarehouseRepository)
    private warehouseRepository: WarehouseRepository,
    @repository(UserRepository)
    private userRepository: UserRepository,
    @repository(AccountRepository)
    private accountRepository: AccountRepository,
    @repository(LedgerEntryRepository)
    private ledgerEntryRepository: LedgerEntryRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  @post('/inventory/movements', {
    responses: {
      '201': {
        description: 'Inventory Movement instance',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': InventoryMovement},
              },
            },
          },
        },
      },
    },
  })
  async registerMovement(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'companyId',
              'productId',
              'warehouseId',
              'type',
              'quantity',
            ],
            properties: {
              companyId: {type: 'string'},
              productId: {type: 'string'},
              warehouseId: {type: 'string'},
              type: {type: 'string', enum: ['IN', 'OUT', 'ADJUST']},
              quantity: {type: 'number'},
              userId: {
                type: 'string',
                description:
                  'ID del usuario que realiza el movimiento. Requerido para ADJUST.',
              },
              referenceType: {type: 'string'},
              referenceId: {type: 'string'},
            },
          },
        },
      },
    })
    movementData: Partial<InventoryMovement>,
  ): Promise<ApiResponse<InventoryMovement>> {
    const useCase = new RegisterMovementUseCase(
      this.inventoryRepository,
      this.productRepository,
      this.warehouseRepository,
      this.userRepository,
      this.accountRepository,
      this.ledgerEntryRepository,
    );
    try {
      this.responseObj.status(201);
      const result = await useCase.execute(movementData);
      return ApiResponse.success(result, 'Movimiento registrado exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/inventory/stock/{companyId}/{productId}/{warehouseId}')
  @response(200, {
    description: 'Current Stock',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'number'},
          },
        },
      },
    },
  })
  async getStock(
    @param.path.string('companyId') companyId: string,
    @param.path.string('productId') productId: string,
    @param.path.string('warehouseId') warehouseId: string,
  ): Promise<ApiResponse<number>> {
    const useCase = new GetStockUseCase(this.inventoryRepository);
    try {
      const stock = await useCase.execute(companyId, productId, warehouseId);
      return ApiResponse.success(stock, 'Stock recuperado exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
