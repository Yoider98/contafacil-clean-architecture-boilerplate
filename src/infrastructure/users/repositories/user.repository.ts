import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {User} from '../../../domain/users/entities/user.entity';
import {UserRole} from '../../../domain/users/enums/user-role.enum';
import {IUserRepository} from '../../../domain/users/repositories/user.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {UserMapper} from '../mappers/user.mapper';
import {UserModel} from '../models/user.model';
import {UserCompanyModel} from '../models/user-company.model';

export class UserRepository implements IUserRepository {
  private lbRepository: DefaultCrudRepository<UserModel, string>;
  private userCompanyLbRepo: DefaultCrudRepository<UserCompanyModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(UserModel, dataSource);
    this.userCompanyLbRepo = new DefaultCrudRepository(UserCompanyModel, dataSource);
  }

  async create(user: User): Promise<User>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
    }
    
    const domainUser = UserMapper.toDomain(saved);
    domainUser.companyId = user.companyId;
    domainUser.role = user.role;
    return domainUser;
  }

  async findById(id: string): Promise<User>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    });
    if (relation)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    
    return domainUser;
  }

  async findByEmail(email: string): Promise<User | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    if (!model) return null;
    
    const domainUser = UserMapper.toDomain(model);
    
    // Buscar relación de empresa
    const [relation] = await this.userCompanyLbRepo.find({
      where: {userId: model.id}
    });
    if (relation)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    
    return domainUser;
  }

  async findByCompany(companyId: string): Promise<User[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    const userIds = userCompanies.map(uc => uc.userId);
    if (userIds.length === 0) return [];
    
    const models = await this.lbRepository.find({
      where: {
        id: {inq: userIds}
      }
    });
    
    return models.map(m => {
      const u = UserMapper.toDomain(m);
      const uc = userCompanies.find(x => x.userId === m.id);
      if (uc)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
      return u;
    });
  }

  async update(user: User): Promise<void>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
      });
      if (relation?.id)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else {
        await this.userCompanyLbRepo.create({
          userId: user.id,
          companyId: user.companyId,
          role: user.role,
        });
      }
    }
  }
}
