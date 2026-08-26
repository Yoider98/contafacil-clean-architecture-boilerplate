import {
  post,
  get,
  patch,
  param,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {inject} from '@loopback/core';
import {InvoiceResolutionRepository} from '../../../infrastructure/invoices/repositories/invoice-resolution.repository';
import {CreateInvoiceResolutionUseCase} from '../../../application/invoices/use-cases/create-invoice-resolution.use-case';
import {InvoiceResolutionModel} from '../../../infrastructure/invoices/models/invoice-resolution.model';
import {InvoiceResolution} from '../../../domain/invoices/entities/invoice-resolution.entity';
import {ApiResponse} from '../../../shared/responses/api.response';

export class InvoiceResolutionController {
  constructor(
    @inject('repositories.InvoiceResolutionRepository')
    public resolutionRepository: InvoiceResolutionRepository,

    @inject('currentCompanyId')
    private currentCompanyId: string,
  ) {}

  @post('/invoice-resolutions')
  @response(201, {
    description: 'Resolución de facturación creada exitosamente',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'resolutionNumber',
              'prefix',
              'fromNumber',
              'toNumber',
              'validFrom',
              'validTo',
            ],
            properties: {
              companyId: {type: 'string'},
              resolutionNumber: {type: 'string'},
              prefix: {type: 'string'},
              fromNumber: {type: 'number'},
              toNumber: {type: 'number'},
              validFrom: {type: 'string', format: 'date-time'},
              validTo: {type: 'string', format: 'date-time'},
              technicalKey: {type: 'string'},
              documentType: {type: 'string'},
            },
          },
        },
      },
    })
    data: Omit<InvoiceResolutionModel, 'id'>,
  ) {
    // Inyectar de forma transparente la empresa activa
    data.companyId = this.currentCompanyId;

    try {
      const useCase = new CreateInvoiceResolutionUseCase(
        this.resolutionRepository,
      );
      const created = await useCase.execute(data);
      return ApiResponse.success(
        created,
        'Resolución de facturación creada exitosamente',
      );
    } catch (error) {
      throw new HttpErrors.BadRequest(
        error instanceof Error
          ? error.message
          : 'Error al crear resolución de facturación',
      );
    }
  }

  @get('/invoice-resolutions')
  @response(200, {
    description: 'Lista de resoluciones de la empresa',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async find(
    @param.query.string('companyId') companyId?: string,
  ) {
    // Usar la empresa del contexto / header
    const targetCompanyId = companyId || this.currentCompanyId;

    try {
      const list = await this.resolutionRepository.findAll(targetCompanyId);
      return ApiResponse.success(list, 'Resoluciones obtenidas exitosamente');
    } catch (error) {
      throw new HttpErrors.BadRequest(
        error instanceof Error
          ? error.message
          : 'Error al consultar resoluciones',
      );
    }
  }

  @get('/invoice-resolutions/{id}/next-number')
  @response(200, {
    description: 'Generar y reservar el siguiente consecutivo de factura',
  })
  async getNextNumber(
    @param.path.string('id') id: string,
    @param.query.string('companyId', {required: true}) companyId: string,
  ) {
    try {
      const nextNumber =
        await this.resolutionRepository.incrementAndGetNextNumber(
          id,
          companyId,
        );
      return ApiResponse.success(
        {nextNumber},
        'Consecutivo generado exitosamente',
      );
    } catch (error) {
      throw new HttpErrors.BadRequest(
        error instanceof Error ? error.message : 'Error al generar consecutivo',
      );
    }
  }

  @patch('/invoice-resolutions/{id}', {
    responses: {
      '200': {
        description: 'Resolución de facturación actualizada exitosamente',
        content: {'application/json': {schema: {type: 'object'}}},
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
              resolutionNumber: {type: 'string'},
              prefix: {type: 'string'},
              fromNumber: {type: 'number'},
              toNumber: {type: 'number'},
              validFrom: {type: 'string', format: 'date-time'},
              validTo: {type: 'string', format: 'date-time'},
              technicalKey: {type: 'string'},
              documentType: {type: 'string'},
              isActive: {type: 'boolean'},
            },
          },
        },
      },
    })
    data: Partial<InvoiceResolutionModel>,
  ): Promise<ApiResponse<void>> {
    try {
      const existing = await this.resolutionRepository.findById(id, this.currentCompanyId);
      if (!existing) {
        throw new Error('Resolución de facturación no encontrada');
      }

      const updated = new InvoiceResolution({
        ...existing,
        ...data,
        id,
        companyId: this.currentCompanyId
      } as any);

      await this.resolutionRepository.update(updated);
      return ApiResponse.success(undefined, 'Resolución de facturación actualizada exitosamente');
    } catch (error) {
      throw new HttpErrors.BadRequest(
        error instanceof Error ? error.message : 'Error al actualizar resolución de facturación',
      );
    }
  }
}
