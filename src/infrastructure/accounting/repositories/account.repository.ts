import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Account} from '../../../domain/accounting/entities/account.entity';
import {IAccountRepository} from '../../../domain/accounting/repositories/accounting.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {AccountingMapper} from '../mappers/accounting.mapper';
import {AccountModel} from '../models/account.model';

export class AccountRepository implements IAccountRepository {
  private lbRepository: DefaultCrudRepository<AccountModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(AccountModel, dataSource);
  }

  async create(account: Account): Promise<Account>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<Account>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findAll(companyId: string): Promise<Account[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => AccountingMapper.toAccountDomain(m));
  }

  async findByCode(companyId: string, code: string): Promise<Account | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    if (!models || models.length === 0) return null;
    return AccountingMapper.toAccountDomain(models[0]);
  }
}
