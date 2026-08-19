import {
  globalInterceptor,
  Interceptor,
  InvocationContext,
  Provider,
  ValueOrPromise,
  inject,
} from '@loopback/core';
import { RestBindings, HttpErrors } from '@loopback/rest';
import { AuthRepository } from '../../../infrastructure/auth/repositories/auth.repository';
import { UserCompanyRepository } from '../../../infrastructure/users/repositories/user-company.repository';

@globalInterceptor('auth', { tags: { global: true } })
export class AuthInterceptor implements Provider<Interceptor> {
  constructor(
    @inject('repositories.AuthRepository')
    private authRepo: AuthRepository,
    @inject('repositories.UserCompanyRepository')
    private userCompanyRepo: UserCompanyRepository,
  ) { }

  value(): Interceptor {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<unknown>,
  ) {
    const request = await invocationCtx.get(RestBindings.Http.REQUEST);
    const path = request.path;
    const method = request.method;

    // Permitir acceso libre a endpoints públicos (Auth, Explorador API y Registro de usuario)
    if (
      path === '/auth/login' ||
      path.startsWith('/explorer') ||
      path.startsWith('/openapi.json') ||
      (path === '/users' && method === 'POST')
    ) {
      return next();
    }

    // 1. Extraer y validar el Token JWT de autorización
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new HttpErrors.Unauthorized('Falta la cabecera de autorización Bearer');
    }

    const token = authHeader.substring(7);
    let userPayload: { id: string; email: string; role: string };

    try {
      userPayload = this.authRepo.verifyToken(token) as {
        id: string;
        email: string;
        role: string;
      };
    } catch (err) {
      throw new HttpErrors.Unauthorized('Token de autenticación inválido o expirado');
    }

    // 2. Extraer y validar la Empresa Activa (Omitir para la creación o consulta general de empresas)
    const isCompanyAction = path === '/companies' && (method === 'POST' || method === 'GET');
    
    if (isCompanyAction) {
      // Registrar al usuario en el contexto sin validar asociación de empresa activa
      invocationCtx.bind('currentUser').to({
        ...userPayload,
        roleInCompany: 'OWNER',
      });
      return next();
    }

    const companyId = request.headers['x-company-id'] as string;
    if (!companyId) {
      throw new HttpErrors.BadRequest('Falta la cabecera X-Company-Id con la empresa activa');
    }

    // 3. Validar asociación multiempresa del usuario
    const userCompanyMapping = await this.userCompanyRepo.findOne({
      where: {
        userId: userPayload.id,
        companyId: companyId,
      },
    });

    if (!userCompanyMapping) {
      throw new HttpErrors.Forbidden('No tienes acceso autorizado a la empresa solicitada');
    }

    // 4. Inyectar datos de sesión en el contexto de Loopback para controladores y Use Cases
    invocationCtx.bind('currentUser').to({
      ...userPayload,
      roleInCompany: userCompanyMapping.role,
    });
    invocationCtx.bind('currentCompanyId').to(companyId);

    return next();
  }
}
