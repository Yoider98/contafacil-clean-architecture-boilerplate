import {inject} from '@loopback/core';
import {ITokenRepositoryInterface} from '../../../domain/auth/repositories/token.repository.interface';
import {IUserRepository} from '../../../domain/users/repositories/user.repository.interface';
import {ICompanyRepository} from '../../../domain/companies/repositories/company.repository.interface';
import {UserCompanyRepository} from '../../../infrastructure/users/repositories/user-company.repository';
import {UserRole} from '../../../domain/users/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

export class LoginUseCase {
  constructor(
    @inject('repositories.UserRepository')
    private userRepo: IUserRepository,
    @inject('repositories.AuthRepository')
    private tokenService: ITokenRepositoryInterface,
    @inject('repositories.CompanyRepository')
    private companyRepo: ICompanyRepository,
    @inject('repositories.UserCompanyRepository')
    private userCompanyRepo: UserCompanyRepository,
  ) {}

  async execute(email: string, password: string)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  };
    }

    // Buscar empresas asociadas en la tabla intermedia user_companies
    const userCompanies = await this.userCompanyRepo.find({
      where: {userId: user.id},
    });

    const associatedCompanies = [];
    for (const uc of userCompanies)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
      } catch (err)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    }

    const activeCompany = associatedCompanies.length > 0 ? associatedCompanies[0] : null;

    // Usar el rol de la empresa activa como rol principal en el token
    const primaryRole = activeCompany ? activeCompany.role : (user.role ?? UserRole.SELLER);

    const token = this.tokenService.generateToken({
      id: user.id,
      email: user.email,
      role: primaryRole,
    });

    return {
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: primaryRole,
        },
        activeCompany,
        associatedCompanies,
        permissions: (user.permissions && user.permissions.length > 0)
          ? user.permissions
          : (primaryRole === UserRole.OWNER ? ['ALL'] : []),
      },
      success: true,
      message: 'Inicio de sesión exitoso',
    };
  }
}
