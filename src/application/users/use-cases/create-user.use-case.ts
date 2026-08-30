import { User } from '../../../domain/users/entities/user.entity';
import { UserRole } from '../../../domain/users/enums/user-role.enum';
import { IUserRepository } from '../../../domain/users/repositories/user.repository.interface';
import { ICompanyRepository } from '../../../domain/companies/repositories/company.repository.interface';
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

export interface CreateUserDto {
  companyId?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  permissions?: string[];
}

export interface IUserCompanyRepository {
  create(data: {id: string; userId: string; companyId: string; role: string; permissions?: string[]}): Promise<any>;
}

export class CreateUserUseCase  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async execute(dto: CreateUserDto): Promise<User>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }`,
      );

    // Validar y asignar permisos según el rol
    let finalPermissions: string[] = [];
    if (dto.role === UserRole.OWNER)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else {
      if (!dto.permissions || dto.permissions.length === 0)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
      finalPermissions = dto.permissions;
    }

    // Validar que la empresa existe si se suministra
    if (dto.companyId)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    // Validar email único
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new Error(`Email '${dto.email}' is already in use`);

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.create(
      new User({
        companyId: dto.companyId ?? '',
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        permissions: finalPermissions,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    // Crear la relación intermedia de multiempresa para autorizar accesos si se pasa empresa
    if (dto.companyId)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
    }

    return user;
  }
}
