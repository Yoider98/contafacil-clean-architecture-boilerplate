import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  param,
  patch,
  post,
  requestBody,
  response,
  Request,
  Response,
  RestBindings,
} from '@loopback/rest';
import {JwtPayload} from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';

import {
  CreateCompanyDto,
  CreateCompanyUseCase,
} from '../../../application/companies/use-cases/create-company.use-case';
import {
  UpdateCompanyFiscalProfileUseCase,
  UpdateCompanyFiscalProfileDTO,
} from '../../../application/companies/use-cases/update-company-fiscal-profile.use-case';
import {
  UpdateCompanyInfoUseCase,
  UpdateCompanyInfoDTO,
} from '../../../application/companies/use-cases/update-company-info.use-case';
import {
  PersonType,
  TaxRegime,
  CompanyType,
} from '../../../domain/companies/enums/company-fiscal.enum';
import {Company} from '../../../domain/companies/entities/company.entity';
import {CompanyRepository} from '../../../infrastructure/companies/repositories/company.repository';
import {UserCompanyRepository} from '../../../infrastructure/users/repositories/user-company.repository';
import {AuthRepository} from '../../../infrastructure/auth/repositories/auth.repository';
import {UserRole} from '../../../domain/users/enums/user-role.enum';
import {ApiResponse} from '../../../shared/responses/api.response';


export class CompaniesController {
  private readonly authRepository = new AuthRepository();

  constructor(
    @repository(CompanyRepository)
    private companyRepository: CompanyRepository,

    @repository(UserCompanyRepository)
    private userCompanyRepository: UserCompanyRepository,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,

    @inject(RestBindings.Http.REQUEST)
    private requestObj: Request,

    @inject('currentUser', {optional: true})
    private currentUser?: {id: string; email: string; role: string},

    @inject('currentCompanyId', {optional: true})
    private currentCompanyId?: string,
  ) {}

  // POST /companies — Crear empresa
  @post('/companies', {
    responses: {
      '201': {
        description: 'Empresa creada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': Company},
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
            required: ['name', 'plan'],
            properties: {
              name: {type: 'string', description: 'Nombre de la empresa'},
              plan: {
                type: 'string',
                description: 'Plan de suscripción (ej: FREE, PRO, ENTERPRISE)',
              },
              companyType: {
                type: 'string',
                description: 'Tipo de empresa (COMMERCIAL, SERVICE)',
              },
              imageUrl: {
                type: 'string',
                description: 'URL de la imagen o logotipo de la empresa',
              },
              phoneNumber: {
                type: 'string',
                description: 'Número de teléfono de contacto',
              },
              address: {
                type: 'string',
                description: 'Dirección física de la empresa',
              },
              city: {
                type: 'string',
                description: 'Ciudad de la empresa',
              },
              department: {
                type: 'string',
                description: 'Departamento / estado de la empresa',
              },
              country: {
                type: 'string',
                description: 'País de la empresa',
              },
              contactEmail: {
                type: 'string',
                description: 'Correo electrónico de contacto de la empresa',
              },
              website: {
                type: 'string',
                description: 'Sitio web de la empresa',
              },
              postalCode: {
                type: 'string',
                description: 'Código postal de la empresa',
              },
              userId: {
                type: 'string',
                description: 'ID del usuario dueño de la empresa',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de creación de la empresa',
              },
              updateAt: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de última actualización de la empresa',
              },
            },
          },
        },
      },
    })
    dto: CreateCompanyDto,
  ): Promise<ApiResponse<Company>> {
    let userId = dto.userId ?? this.currentUser?.id;

    // Si no viene userId en el body ni en el contexto, intentar sacarlo del token JWT manualmente
    if (!userId) {
      const authHeader = this.requestObj.headers['authorization'];
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
          const decoded = this.authRepository.verifyToken(token);
          if (typeof decoded !== 'string') {
            userId = (decoded as JwtPayload).id;
          }
        } catch {
          // Ignorar error del token si no es obligatorio
        }
      }
    }

    try {
      this.responseObj.status(201);
      const company = await new CreateCompanyUseCase(
        this.companyRepository,
      ).execute(dto);

      if (userId) {
        await this.userCompanyRepository.create({
          id: uuidv4(),
          userId: userId,
          companyId: company.id,
          role: 'OWNER',
        });
      }

      return ApiResponse.success(company, 'Empresa creada exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /companies — Listar todas las empresas
  @get('/companies')
  @response(200, {
    description: 'Lista de empresas',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': Company}},
          },
        },
      },
    },
  })
  async findAll(): Promise<ApiResponse<Company[]>> {
    const companies = await this.companyRepository.findAll();
    return ApiResponse.success(companies, 'Empresas recuperadas exitosamente');
  }

  // GET /companies/{id} — Detalle de empresa
  @get('/companies/{id}')
  @response(200, {
    description: 'Detalle de la empresa',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {'x-ts-type': Company},
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<Company>> {
    try {
      const company = await this.companyRepository.findById(id);
      return ApiResponse.success(company, 'Empresa recuperada exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // POST /companies/fiscal-profile — Actualizar perfil fiscal
  @post('/companies/fiscal-profile')
  @response(200, {
    description: 'Perfil fiscal actualizado exitosamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {'x-ts-type': Company},
          },
        },
      },
    },
  })
  async updateFiscalProfile(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              nit: {type: 'string'}, // NIT (Número de Identificación Tributaria)
              dv: {type: 'string'}, // Dígito de Verificación (calculado automáticamente)
              personType: {type: 'string'}, // Tipo de persona (NATURAL o JURIDICA)
              taxRegime: {type: 'string'}, // Régimen tributario (RESPONSABLE_IVA, NO_RESPONSABLE_IVA, REGIMEN_SIMPLE)
              economicActivityCode: {type: 'string'},// Código CIIU (Clasificación Industrial Internacional Uniforme)
              companyType: {type: 'string'}, // Tipo de empresa (COMMERCIAL, SERVICES, MANUFACTURING, MIXED)
              merchantRegister: {type: 'string'},// Registro mercantil
              taxObligations: {type: 'array', items: {type: 'string'}}, // Obligaciones tributarias
            },
          },
        },
      },
    })
    body: {
      nit?: string;
      personType?: string;
      taxRegime?: string;
      economicActivityCode?: string;
      companyType?: string;
      merchantRegister?: string;
      taxObligations?: string[];
    },
  ): Promise<ApiResponse<Company>> {
    try {
      if (!this.currentCompanyId) {
        throw new Error('Falta la cabecera X-Company-Id con la empresa activa');
      }
      const useCase = new UpdateCompanyFiscalProfileUseCase(
        this.companyRepository,
      );
      // Build profile object; strings will be validated/converted in domain
      const {personType, taxRegime, companyType, ...rest} = body;
      const profile: Partial<UpdateCompanyFiscalProfileDTO> = {
        companyId: this.currentCompanyId,
        ...rest,
      } as Partial<UpdateCompanyFiscalProfileDTO>;
      if (personType) profile.personType = personType as unknown as PersonType;
      if (taxRegime) profile.taxRegime = taxRegime as unknown as TaxRegime;
      if (companyType)
        profile.companyType = companyType as unknown as CompanyType;
      const updated = await useCase.execute(
        profile as UpdateCompanyFiscalProfileDTO,
      );
      return ApiResponse.success(
        updated,
        'Perfil fiscal actualizado exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // PATCH /companies/{id} — Actualizar información general (solo OWNER)
  @patch('/companies/{id}')
  @response(200, {
    description: 'Información de la empresa actualizada exitosamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {'x-ts-type': Company},
          },
        },
      },
    },
  })
  async updateInfo(
    @param.path.string('id') id: string,
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {type: 'string', description: 'Nombre de la empresa'},
              imageUrl: {
                type: 'string',
                description: 'URL del logotipo de la empresa',
              },
              phoneNumber: {
                type: 'string',
                description: 'Número de teléfono de contacto',
              },
              address: {
                type: 'string',
                description: 'Dirección física de la empresa',
              },
              city: {type: 'string', description: 'Ciudad'},
              department: {
                type: 'string',
                description: 'Departamento / Estado',
              },
              country: {type: 'string', description: 'País'},
              contactEmail: {
                type: 'string',
                description: 'Correo electrónico de contacto',
              },
              website: {type: 'string', description: 'Sitio web'},
              postalCode: {type: 'string', description: 'Código postal'},
            },
          },
        },
      },
    })
    body: Omit<UpdateCompanyInfoDTO, 'companyId'>,
  ): Promise<ApiResponse<Company>> {
    // Validar token JWT
    const authHeader = this.requestObj.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.responseObj.status(401);
      return ApiResponse.error('Token de autorización requerido');
    }

    const token = authHeader.split(' ')[1];
    let payload: JwtPayload;
    try {
      const decoded = this.authRepository.verifyToken(token);
      if (typeof decoded === 'string') throw new Error('Token inválido');
      payload = decoded as JwtPayload;
    } catch {
      this.responseObj.status(401);
      return ApiResponse.error('Token inválido o expirado');
    }

    // Validar rol OWNER
    if (payload.role !== UserRole.OWNER) {
      this.responseObj.status(403);
      return ApiResponse.error(
        'Acceso denegado: solo el dueño puede actualizar la información de la empresa',
      );
    }

    try {
      const useCase = new UpdateCompanyInfoUseCase(this.companyRepository);
      const updated = await useCase.execute({companyId: id, ...body});
      return ApiResponse.success(
        updated,
        'Información de la empresa actualizada exitosamente',
      );
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
