import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors,
  get,
  param,
  post,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {
  CreateQuotationDto,
  CreateQuotationUseCase,
} from '../../../application/sales/use-cases/create-quotation.use-case';
import {Quotation} from '../../../domain/sales/entities/quotation.entity';
import {QuotationItem} from '../../../domain/sales/entities/quotation-item.entity';
import {QuotationRepository} from '../../../infrastructure/sales/repositories/quotation.repository';
import {QuotationItemRepository} from '../../../infrastructure/sales/repositories/quotation-item.repository';
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

export class QuotationController {
  constructor(
    @repository(QuotationRepository)
    private quotationRepository: QuotationRepository,

    @repository(QuotationItemRepository)
    private quotationItemRepository: QuotationItemRepository,

    @repository(MasterlistRepository)
    private masterlistRepository: MasterlistRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,

    @inject('currentCompanyId')
    private currentCompanyId: string,
  ) {}

  // POST /quotations — Crear una nueva cotización
  @post('/quotations', {
    responses: {
      '201': {
        description: 'Cotización creada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': Quotation},
              },
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      description: 'Datos de la cotización a crear',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['thirdPartyId', 'items'],
            properties: {
              thirdPartyId: {type: 'string'},
              issueDate: {type: 'string'},
              validityDays: {type: 'number'},
              currency: {type: 'string'},
              notes: {type: 'string'},
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
    dto: CreateQuotationDto,
  ): Promise<ApiResponse<Quotation>> {
    dto.companyId = this.currentCompanyId;

    const useCase = new CreateQuotationUseCase(
      this.quotationRepository,
      this.quotationItemRepository,
      this.masterlistRepository,
    );

    try {
      this.responseObj.status(201);
      const quotation = await useCase.execute(dto);
      return ApiResponse.success(quotation, 'Cotización creada exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /quotations — Listar cotizaciones de la empresa activa
  @get('/quotations')
  @response(200, {
    description: 'Lista de cotizaciones',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': Quotation}},
          },
        },
      },
    },
  })
  async findAll(): Promise<ApiResponse<Quotation[]>> {
    const quotations = await this.quotationRepository.findAllByCompany(
      this.currentCompanyId,
    );
    return ApiResponse.success(quotations, 'Cotizaciones recuperadas exitosamente');
  }

  // GET /quotations/{id} — Obtener cotización por ID
  @get('/quotations/{id}')
  @response(200, {
    description: 'Detalle de la cotización',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {'x-ts-type': Quotation},
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<Quotation>> {
    try {
      assertUuid(id);
      const quotation = await this.quotationRepository.findById(id);

      if (quotation.companyId !== this.currentCompanyId) {
        throw new HttpErrors.Forbidden('No tienes permiso para acceder a esta cotización');
      }

      return ApiResponse.success(quotation, 'Cotización recuperada exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(
        err instanceof HttpErrors.HttpError ? err.statusCode : 422,
      );
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /quotations/{id}/items — Obtener ítems de la cotización
  @get('/quotations/{id}/items')
  @response(200, {
    description: 'Ítems de la cotización',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': QuotationItem}},
          },
        },
      },
    },
  })
  async findItems(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<QuotationItem[]>> {
    try {
      assertUuid(id);
      const quotation = await this.quotationRepository.findById(id);

      if (quotation.companyId !== this.currentCompanyId) {
        throw new HttpErrors.Forbidden(
          'No tienes permiso para acceder a los ítems de esta cotización',
        );
      }

      const items = await this.quotationItemRepository.findByQuotationId(id);
      return ApiResponse.success(
        items,
        'Ítems de la cotización recuperados exitosamente',
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
}
