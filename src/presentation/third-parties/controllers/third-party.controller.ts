import {
  post,
  get,
  put,
  param,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { inject } from '@loopback/core';
import { ThirdPartyRepository } from '../../../infrastructure/third-parties/repositories/third-party.repository';
import { CreateThirdPartyUseCase } from '../../../application/third-parties/use-cases/create-third-party.use-case';
import { GetThirdPartiesUseCase } from '../../../application/third-parties/use-cases/get-third-parties.use-case';
import { ThirdPartyModel } from '../../../infrastructure/third-parties/models/third-party.model';
import { ApiResponse } from '../../../shared/responses/api.response';
import { ThirdParty } from '../../../domain/third-parties/entities/third-party.entity';

export class ThirdPartyController {
  constructor(
    @inject('repositories.ThirdPartyRepository')
    public thirdPartyRepository: ThirdPartyRepository,
    @inject('currentCompanyId')
    private currentCompanyId: string,
  ) { }

  @post('/third-parties')
  @response(201, {
    description: 'Tercero creado exitosamente',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'personType',
              'documentType',
              'identificationNumber',
              'name',
              'roles',
              'taxRegime',
              'address',
              'cityCode',
              'departmentCode',
              'email',
              'phone',
            ],
            properties: {
              companyId: { type: 'string' },
              personType: { type: 'string' },
              documentType: { type: 'string' },
              identificationNumber: { type: 'string' },
              name: { type: 'string' },
              tradeName: { type: 'string' },
              roles: { type: 'array', items: { type: 'string' } },
              taxRegime: { type: 'string' },
              economicActivityCode: { type: 'string' },
              address: { type: 'string' },
              cityCode: { type: 'string' },
              departmentCode: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              isSelfRetainer: { type: 'boolean' },
            },
          },
        },
      },
    })
    data: Omit<ThirdPartyModel, 'id'>,
  ) {
    try {
      // Inyectar automáticamente el ID de la empresa validada
      data.companyId = this.currentCompanyId;
      const useCase = new CreateThirdPartyUseCase(this.thirdPartyRepository);
      const created = await useCase.execute(data);
      return ApiResponse.success(created, 'Tercero creado exitosamente');
    } catch (error) {
      throw new HttpErrors.BadRequest(
        error instanceof Error ? error.message : 'Error al crear tercero',
      );
    }
  }

  @get('/third-parties')
  @response(200, {
    description: 'Lista de terceros de la empresa',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async find(
    @param.query.string('companyId', { required: true }) companyId: string,
    @param.query.string('role') role?: string,
    @param.query.string('search') search?: string,
    @param.query.boolean('includeInactive') includeInactive?: boolean,
  ) {
    try {
      const useCase = new GetThirdPartiesUseCase(this.thirdPartyRepository);
      const list = await useCase.execute(companyId, { role, search, includeInactive });
      return ApiResponse.success(list, 'Terceros obtenidos exitosamente');
    } catch (error) {
      throw new HttpErrors.BadRequest(
        error instanceof Error ? error.message : 'Error al consultar terceros',
      );
    }
  }

  @get('/third-parties/{id}')
  @response(200, {
    description: 'Detalle de un tercero',
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.string('companyId', { required: true }) companyId: string,
  ) {
    const thirdParty = await this.thirdPartyRepository.findById(id, companyId);
    if (!thirdParty) {
      throw new HttpErrors.NotFound('Tercero no encontrado');
    }
    return ApiResponse.success(thirdParty, 'Tercero obtenido exitosamente');
  }

  @put('/third-parties/{id}')
  @response(200, {
    description: 'Tercero actualizado exitosamente',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              companyId: { type: 'string' },
              personType: { type: 'string' },
              documentType: { type: 'string' },
              identificationNumber: { type: 'string' },
              name: { type: 'string' },
              tradeName: { type: 'string' },
              roles: { type: 'array', items: { type: 'string' } },
              taxRegime: { type: 'string' },
              economicActivityCode: { type: 'string' },
              address: { type: 'string' },
              cityCode: { type: 'string' },
              departmentCode: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              isSelfRetainer: { type: 'boolean' },
              isActive: { type: 'boolean' },
            },
          },
        },
      },
    })
    data: Partial<ThirdPartyModel>,
  ) {
    try {
      const companyId = data.companyId ?? '';
      const existing = await this.thirdPartyRepository.findById(id, companyId);
      if (!existing) {
        throw new HttpErrors.NotFound('Tercero no encontrado');
      }

      const updatedEntity = new ThirdParty({
        ...existing,
        ...data,
        id,
        updatedAt: new Date()
      });

      const updated = await this.thirdPartyRepository.update(updatedEntity);
      return ApiResponse.success(updated, 'Tercero actualizado exitosamente');
    } catch (error) {
      throw new HttpErrors.BadRequest(
        error instanceof Error ? error.message : 'Error al actualizar tercero',
      );
    }
  }
}
