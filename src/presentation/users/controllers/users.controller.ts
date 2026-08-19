import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import {
  get,
  param,
  post,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {
  CreateUserDto,
  CreateUserUseCase,
} from '../../../application/users/use-cases/create-user.use-case';
import { User } from '../../../domain/users/entities/user.entity';
import { UserRole } from '../../../domain/users/enums/user-role.enum';
import { CompanyRepository } from '../../../infrastructure/companies/repositories/company.repository';
import { UserRepository } from '../../../infrastructure/users/repositories/user.repository';
import { UserCompanyRepository } from '../../../infrastructure/users/repositories/user-company.repository';
import { ApiResponse } from '../../../shared/responses/api.response';

export class UsersController {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,

    @repository(CompanyRepository)
    private companyRepository: CompanyRepository,

    @repository(UserCompanyRepository)
    private userCompanyRepository: UserCompanyRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) { }

  // POST /users — Crear usuario
  @post('/users', {
    responses: {
      '201': {
        description: 'Usuario creado exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                message: { type: 'string' },
                data: { 'x-ts-type': User },
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
            required: ['name', 'email', 'password', 'role'],
            properties: {
              companyId: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              password: { type: 'string', minLength: 6 },
              role: {
                type: 'string',
                enum: ['OWNER', 'ADMIN', 'SELLER'],
                description:
                  'OWNER=Dueño | ADMIN=Administrador | SELLER=Gestionador',
              },
              permissions: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
        },
      },
    })
    dto: CreateUserDto,
  ): Promise<ApiResponse<User>> {
    const useCase = new CreateUserUseCase(
      this.companyRepository,
      this.userRepository,
      this.userCompanyRepository,
    );
    try {
      this.responseObj.status(201);
      const user = await useCase.execute(dto);
      return ApiResponse.success(user, 'Usuario creado exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /users?companyId= — Listar usuarios de una empresa
  @get('/users')
  @response(200, {
    description: 'Lista de usuarios de la empresa',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'array', items: { 'x-ts-type': User } },
          },
        },
      },
    },
  })
  async findAll(
    @param.query.string('companyId') companyId: string,
  ): Promise<ApiResponse<User[]>> {
    if (!companyId) {
      return ApiResponse.error('companyId is required');
    }
    const users = await this.userRepository.findByCompany(companyId);
    return ApiResponse.success(users, 'Usuarios recuperados exitosamente');
  }

  // GET /users/{id} — Detalle de usuario
  @get('/users/{id}')
  @response(200, {
    description: 'Detalle del usuario',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { 'x-ts-type': User },
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<User>> {
    try {
      const user = await this.userRepository.findById(id);
      return ApiResponse.success(user, 'Usuario recuperado exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // PATCH /users/{id} — Actualizar usuario
  @post('/users/{id}/update')
  @response(200, {
    description: 'Usuario actualizado exitosamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { 'x-ts-type': User },
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
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              password: { type: 'string' },
              role: { type: 'string', enum: ['OWNER', 'ADMIN', 'SELLER'] },
              permissions: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      },
    })
    body: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
      permissions?: string[];
    },
  ): Promise<ApiResponse<User>> {
    try {
      const user = await this.userRepository.findById(id);
      if (body.name) user.name = body.name;
      if (body.email) user.email = body.email;
      if (body.password) user.password = body.password; // En la vida real, debe ser encriptada en un UseCase

      if (body.role) {
        user.role = body.role as UserRole;
        if (body.role === 'OWNER') {
          user.permissions = ['ALL'];
        } else if (body.permissions) {
          if (body.permissions.length === 0) {
            throw new Error('Debe asignar al menos un permiso de visualización.');
          }
          user.permissions = body.permissions;
        }
      } else if (body.permissions) {
        if (user.role === 'OWNER') {
          user.permissions = ['ALL'];
        } else {
          if (body.permissions.length === 0) {
            throw new Error('Debe asignar al menos un permiso de visualización.');
          }
          user.permissions = body.permissions;
        }
      }

      user.updatedAt = new Date();
      await this.userRepository.update(user);
      return ApiResponse.success(user, 'Usuario actualizado exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
