import {inject} from '@loopback/core';
import {DefaultCrudRepository, AnyObject} from '@loopback/repository';
import AccountingPeriodModel from '../models/accounting-period.model';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {IAccountingPeriodRepository} from '../../../domain/accounting/repositories/accounting-period.repository.interface';
import AccountingPeriodMapper from '../mappers/accounting-period.mapper';
import {AccountingPeriod} from '../../../domain/accounting/entities/accounting-period.entity';

export class AccountingPeriodRepository implements IAccountingPeriodRepository {
  private lbRepository: DefaultCrudRepository<
    AccountingPeriodModel,
    typeof AccountingPeriodModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(
      AccountingPeriodModel,
      dataSource,
    );
  }

  async create(period: AccountingPeriod): Promise<AccountingPeriod>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<AccountingPeriod | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return model ? AccountingPeriodMapper.toDomain(model) : null;
  }

  async findOpenByCompany(companyId: string): Promise<AccountingPeriod | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return model ? AccountingPeriodMapper.toDomain(model) : null;
  }

  async close(period: AccountingPeriod): Promise<AccountingPeriod>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
