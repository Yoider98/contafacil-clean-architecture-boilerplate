import {User} from '../../../domain/users/entities/user.entity';
import {UserRole} from '../../../domain/users/enums/user-role.enum';
import {IUserRepository} from '../../../domain/users/repositories/user.repository.interface';
import {ICompanyRepository} from '../../../domain/companies/repositories/company.repository.interface';
import * as bcrypt from 'bcrypt';

export interface CreateUserDto {
  companyId: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  permissions?: string[];
}

export class CreateUserUseCase {
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private readonly userRepository: IUserRepository,
  )  { /* Inyectado por constructor */ }

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

    // Validar que la empresa existe
    await this.companyRepository.findById(dto.companyId);

    // Validar email único
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new Error(`Email '${dto.email}' is already in use`);

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.userRepository.create(
      new User({
        companyId: dto.companyId,
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        permissions: finalPermissions,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }
}
