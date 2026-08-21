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
  CreateSaleDto,
  CreateSalesUseCase,
} from '../../../application/sales/use-cases/create-sales.use-case';
import {Sales} from '../../../domain/sales/entities/sales.entity';
import {SalesItem} from '../../../domain/sales/entities/sales-item.entity';
import {AccountRepository} from '../../../infrastructure/accounting/repositories/account.repository';
import {LedgerEntryRepository} from '../../../infrastructure/accounting/repositories/ledger-entry.repository';
import {InventoryRepository} from '../../../infrastructure/inventory/repositories/inventory.repository';
import {ProductRepository} from '../../../infrastructure/inventory/repositories/product.repository';
import {SalesItemRepository} from '../../../infrastructure/sales/repositories/sales-item.repository';
import {SalesRepository} from '../../../infrastructure/sales/repositories/sales.repository';
import {AccountingPeriodRepository} from '../../../infrastructure/accounting/repositories/accounting-period.repository';
import {MasterlistRepository} from '../../../infrastructure/shared/repositories/masterlist.repository';
import {PostgresDataSource} from '../../../infrastructure/database/datasources/postgres.datasource';
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

import {IsolationLevel} from '@loopback/repository';

export class SalesController {
  constructor(
    @repository(SalesRepository)
    private salesRepository: SalesRepository,

    @repository(SalesItemRepository)
    private salesItemRepository: SalesItemRepository,

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

    @inject('currentUser')
    private currentUser: {id: string; email: string; role: string; roleInCompany: string},

    @inject('currentCompanyId')
    private currentCompanyId: string,

    @inject('datasources.postgres')
    private dataSource: PostgresDataSource,

    @repository(AccountingPeriodRepository)
    private accountingPeriodRepository: AccountingPeriodRepository,

    @repository(MasterlistRepository)
    private masterlistRepository: MasterlistRepository,
  ) {}

  // ------------------------------------------------------------------ //
  // POST /sales  — Crear una nueva venta (Transaccionado & Protegido)
  // ------------------------------------------------------------------ //
  @post('/sales', {
    responses: {
      '201': {
        description: 'Venta creada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': Sales},
              },
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      description: 'Datos de la venta a crear',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['warehouseId', 'paymentMethod', 'thirdPartyId', 'items'],
            properties: {
              companyId: {type: 'string', description: 'ID de la empresa'},
              warehouseId: {type: 'string', description: 'ID del almacén'},
              paymentMethod: {type: 'string', description: 'Método de pago'},
              thirdPartyId: {type: 'string', description: 'ID del tercero/cliente'},
              items: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'object',
                  required: ['productId', 'quantity', 'price'],
                  properties: {
                    productId: {type: 'string'},
                    quantity: {type: 'number', minimum: 1},
                    price: {type: 'number', minimum: 0},
                  },
                },
              },
            },
          },
        },
      },
    })
    dto: CreateSaleDto,
  ): Promise<ApiResponse<Sales>> {
    // Inyectar automáticamente el ID de la empresa validada
    dto.companyId = this.currentCompanyId;

    const useCase = new CreateSalesUseCase(
      this.inventoryRepository,
      this.salesRepository,
      this.salesItemRepository,
      this.productRepository,
      this.accountRepository,
      this.ledgerEntryRepository,
      this.accountingPeriodRepository,
      this.masterlistRepository,
    );

    // Iniciar Transacción PostgreSQL P0
    const tx = await this.dataSource.beginTransaction(
      IsolationLevel.READ_COMMITTED,
    );

    try {
      this.responseObj.status(201);
      const sale = await useCase.execute(dto, {transaction: tx});
      await tx.commit();
      return ApiResponse.success(sale, 'Venta creada exitosamente');
    } catch (err: unknown) {
      await tx.rollback();
      this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // ------------------------------------------------------------------ //
  // GET /sales  — Listar todas las ventas (Filtradas por Empresa)
  // ------------------------------------------------------------------ //
  @get('/sales')
  @response(200, {
    description: 'Lista de ventas',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': Sales}},
          },
        },
      },
    },
  })
  async findAll(): Promise<ApiResponse<Sales[]>> {
    // Aislamiento Multiempresa P0: Filtrar por empresa activa
    const sales = await this.salesRepository.findAllByCompany(this.currentCompanyId);
    return ApiResponse.success(sales, 'Ventas recuperadas exitosamente');
  }

  // ------------------------------------------------------------------ //
  // GET /sales/{id}  — Obtener venta por ID (Verificación de Empresa)
  // ------------------------------------------------------------------ //
  @get('/sales/{id}')
  @response(200, {
    description: 'Detalle de la venta',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {'x-ts-type': Sales},
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<Sales>> {
    try {
      assertUuid(id);
      const sale = await this.salesRepository.findById(id);

      // Aislamiento Multiempresa P0: Validar propiedad del recurso
      if (sale.companyId !== this.currentCompanyId) {
        throw new HttpErrors.Forbidden('No tienes permiso para acceder a esta venta');
      }

      return ApiResponse.success(sale, 'Venta recuperada exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(err instanceof HttpErrors.HttpError ? err.statusCode : 422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // ------------------------------------------------------------------ //
  // GET /sales/{id}/items  — Ítems de una venta (Verificación de Empresa)
  // ------------------------------------------------------------------ //
  @get('/sales/{id}/items')
  @response(200, {
    description: 'Ítems de la venta',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': SalesItem}},
          },
        },
      },
    },
  })
  async findItems(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<SalesItem[]>> {
    try {
      assertUuid(id);
      const sale = await this.salesRepository.findById(id);

      // Aislamiento Multiempresa P0: Validar propiedad del recurso
      if (sale.companyId !== this.currentCompanyId) {
        throw new HttpErrors.Forbidden('No tienes permiso para acceder a los ítems de esta venta');
      }

      const items = await this.salesItemRepository.findBySalesId(id);
      return ApiResponse.success(
        items,
        'Ítems de la venta recuperados exitosamente',
      );
    } catch (err: unknown) {
      this.responseObj.status(err instanceof HttpErrors.HttpError ? err.statusCode : 422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // ------------------------------------------------------------------ //
  // PATCH /sales/{id}  — Actualizar pedido de venta (Cambio de Estado)
  // ------------------------------------------------------------------ //
  @patch('/sales/{id}', {
    responses: {
      '200': {
        description: 'Venta actualizada exitosamente',
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
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {type: 'string'},
              invoiceId: {type: 'string'},
              invoiceNumber: {type: 'string'},
            },
          },
        },
      },
    })
    dto: {status?: string; invoiceId?: string; invoiceNumber?: string},
  ): Promise<ApiResponse<void>> {
    try {
      assertUuid(id);
      const sale = await this.salesRepository.findById(id);

      if (sale.companyId !== this.currentCompanyId) {
        throw new HttpErrors.Forbidden('No tienes permiso para actualizar esta venta');
      }

      await this.salesRepository.updateById(id, dto);
      return ApiResponse.success(undefined, 'Venta actualizada exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(err instanceof HttpErrors.HttpError ? err.statusCode : 422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
