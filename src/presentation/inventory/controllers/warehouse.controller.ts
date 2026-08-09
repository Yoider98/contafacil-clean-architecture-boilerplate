import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  param,
  post,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import {CreateWarehouseUseCase} from '../../../application/inventory/use-cases/create-warehouse.use-case';
import {GetWarehousesByCompanyUseCase} from '../../../application/inventory/use-cases/get-warehouses-by-company.use-case';
import {Warehouse} from '../../../domain/inventory/entities/warehouse.entity';
import {WarehouseRepository} from '../../../infrastructure/inventory/repositories/warehouse.repository';
import {ApiResponse} from '../../../shared/responses/api.response';

export class WarehouseController {
  constructor(
    @repository(WarehouseRepository)
    private warehouseRepository: WarehouseRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  @post('/warehouses', {
    responses: {
      '201': {
        description: 'Warehouse model instance',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': Warehouse},
              },
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'companyId'],
            properties: {
              companyId: {type: 'string'},
              name: {type: 'string'},
              location: {type: 'string'},
            },
          },
        },
      },
    })
    warehouseData: Partial<Warehouse>,
  ): Promise<ApiResponse<Warehouse>> {
    try {
      const useCase = new CreateWarehouseUseCase(this.warehouseRepository);
      this.responseObj.status(201);
      const warehouse = await useCase.execute(warehouseData);
      return ApiResponse.success(warehouse, 'Almacén creado exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/warehouses', {
    responses: {
      '200': {
        description: 'Array of Warehouse model instances',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {type: 'array', items: {'x-ts-type': Warehouse}},
              },
            },
          },
        },
      },
    },
  })
  async getByCompany(
    @param.query.string('companyId') companyId: string,
  ): Promise<ApiResponse<Warehouse[]>> {
    try {
      const useCase = new GetWarehousesByCompanyUseCase(
        this.warehouseRepository,
      );
      const warehouses = await useCase.execute(companyId);
      return ApiResponse.success(
        warehouses,
        'Almacenes recuperados exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
