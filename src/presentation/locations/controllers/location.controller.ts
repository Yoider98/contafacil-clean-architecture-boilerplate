import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  param,
  response,
  HttpErrors,
  Response,
  RestBindings,
} from '@loopback/rest';
import {DepartmentRepository} from '../../../infrastructure/locations/repositories/department.repository';
import {CityRepository} from '../../../infrastructure/locations/repositories/city.repository';
import {ApiResponse} from '../../../shared/responses/api.response';

export class LocationController {
  constructor(
    @repository(DepartmentRepository)
    private departmentRepository: DepartmentRepository,

    @repository(CityRepository)
    private cityRepository: CityRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  @get('/locations/departments')
  @response(200, {
    description: 'Lista de departamentos de Colombia recuperada exitosamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  code: {type: 'string'},
                  name: {type: 'string'},
                },
              },
            },
          },
        },
      },
    },
  })
  async getDepartments(): Promise<ApiResponse<any[]>> {
    try {
      const list = await this.departmentRepository.find({
        order: ['name ASC'],
      });
      return ApiResponse.success(list, 'Departamentos cargados exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(500);
      return ApiResponse.error(err instanceof Error ? err.message : String(err));
    }
  }

  @get('/locations/cities')
  @response(200, {
    description: 'Lista de municipios de Colombia recuperada exitosamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  code: {type: 'string'},
                  name: {type: 'string'},
                  departmentCode: {type: 'string'},
                },
              },
            },
          },
        },
      },
    },
  })
  async getCities(
    @param.query.string('departmentCode') departmentCode?: string,
  ): Promise<ApiResponse<any[]>> {
    try {
      const filter: any = {};
      if (departmentCode) {
        filter.departmentCode = departmentCode;
      }

      const list = await this.cityRepository.find({
        where: filter,
        order: ['name ASC'],
      });
      return ApiResponse.success(list, 'Municipios cargados exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(500);
      return ApiResponse.error(err instanceof Error ? err.message : String(err));
    }
  }
}
