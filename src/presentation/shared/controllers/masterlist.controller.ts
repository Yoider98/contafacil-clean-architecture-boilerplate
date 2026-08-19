import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  param,
  post,
  put,
  requestBody,
  response,
  HttpErrors,
  Response,
  RestBindings,
} from '@loopback/rest';
import {Masterlist} from '../../../domain/shared/entities/masterlist.entity';
import {MasterlistCategory} from '../../../domain/shared/enums/masterlist-category.enum';
import {MasterlistRepository} from '../../../infrastructure/shared/repositories/masterlist.repository';
import {GetMasterlistByCategoryUseCase} from '../../../application/shared/use-cases/get-masterlist-by-category.use-case';
import {ApiResponse} from '../../../shared/responses/api.response';

export class MasterlistController {
  constructor(
    @repository(MasterlistRepository)
    private masterlistRepository: MasterlistRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  // ------------------------------------------------------------------ //
  // GET /masterlists  — Obtener ítems de catálogo (opcional categoría)
  // ------------------------------------------------------------------ //
  @get('/masterlists')
  @response(200, {
    description: 'Lista de ítems de catálogo recuperada exitosamente',
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
                  id: {type: 'string'},
                  category: {type: 'string'},
                  code: {type: 'string'},
                  name: {type: 'string'},
                  description: {type: 'string'},
                  isActive: {type: 'boolean'},
                  metadata: {type: 'object'},
                },
              },
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.string('category') category?: string,
  ): Promise<ApiResponse<Masterlist[]>> {
    try {
      if (category) {
        // Validar si la categoría está soportada en el enum
        if (!Object.values(MasterlistCategory).includes(category as MasterlistCategory)) {
          throw new HttpErrors.BadRequest(`Categoría inválida: '${category}'`);
        }
        const useCase = new GetMasterlistByCategoryUseCase(this.masterlistRepository);
        const items = await useCase.execute(category);
        return ApiResponse.success(items, `Catálogos de categoría ${category} recuperados`);
      }

      const items = await this.masterlistRepository.findAll();
      return ApiResponse.success(items, 'Catálogo completo recuperado exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(err instanceof HttpErrors.HttpError ? err.statusCode : 422);
      return ApiResponse.error(err instanceof Error ? err.message : String(err));
    }
  }

  // ------------------------------------------------------------------ //
  // POST /masterlists  — Agregar un nuevo ítem a la masterlist
  // ------------------------------------------------------------------ //
  @post('/masterlists', {
    responses: {
      '201': {
        description: 'Ítem de catálogo creado',
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
      description: 'Datos del ítem de catálogo',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['category', 'code', 'name'],
            properties: {
              category: {type: 'string'},
              code: {type: 'string'},
              name: {type: 'string'},
              description: {type: 'string'},
              isActive: {type: 'boolean', default: true},
              validFrom: {type: 'string', format: 'date-time'},
              validTo: {type: 'string', format: 'date-time'},
              metadata: {type: 'object'},
            },
          },
        },
      },
    })
    data: Partial<Masterlist>,
  ): Promise<ApiResponse<Masterlist>> {
    try {
      if (!data.category || !Object.values(MasterlistCategory).includes(data.category as MasterlistCategory)) {
        throw new HttpErrors.BadRequest(`Categoría inválida o vacía`);
      }

      const entity = new Masterlist(data);
      const saved = await this.masterlistRepository.create(entity);
      this.responseObj.status(201);
      return ApiResponse.success(saved, 'Ítem de catálogo creado exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(err instanceof HttpErrors.HttpError ? err.statusCode : 422);
      return ApiResponse.error(err instanceof Error ? err.message : String(err));
    }
  }

  // ------------------------------------------------------------------ //
  // PUT /masterlists/{id}  — Editar un ítem del catálogo
  // ------------------------------------------------------------------ //
  @put('/masterlists/{id}', {
    responses: {
      '200': {
        description: 'Ítem de catálogo actualizado',
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
  async update(
    @param.path.string('id') id: string,
    @requestBody({
      description: 'Datos a actualizar',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              category: {type: 'string'},
              code: {type: 'string'},
              name: {type: 'string'},
              description: {type: 'string'},
              isActive: {type: 'boolean'},
              validFrom: {type: 'string', format: 'date-time'},
              validTo: {type: 'string', format: 'date-time'},
              metadata: {type: 'object'},
            },
          },
        },
      },
    })
    data: Partial<Masterlist>,
  ): Promise<ApiResponse<Masterlist>> {
    try {
      const existing = await this.masterlistRepository.findById(id);
      if (!existing) throw new HttpErrors.NotFound('Ítem de catálogo no encontrado');

      const updatedEntity = new Masterlist({
        ...existing,
        ...data,
        id,
      });

      const saved = await this.masterlistRepository.update(updatedEntity);
      return ApiResponse.success(saved, 'Ítem de catálogo actualizado exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(err instanceof HttpErrors.HttpError ? err.statusCode : 422);
      return ApiResponse.error(err instanceof Error ? err.message : String(err));
    }
  }
}
