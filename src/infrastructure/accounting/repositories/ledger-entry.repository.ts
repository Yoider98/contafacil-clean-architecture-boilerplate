import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LedgerEntry} from '../../../domain/accounting/entities/ledger-entry.entity';
import {ILedgerEntryRepository} from '../../../domain/accounting/repositories/accounting.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {AccountingMapper} from '../mappers/accounting.mapper';
import {LedgerEntryModel} from '../models/ledger-entry.model';

export class LedgerEntryRepository implements ILedgerEntryRepository {
  private lbRepository: DefaultCrudRepository<LedgerEntryModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(LedgerEntryModel, dataSource);
  }

  async create(entry: LedgerEntry, options?: any): Promise<LedgerEntry>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findByAccount(accountId: string): Promise<LedgerEntry[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => AccountingMapper.toLedgerDomain(m));
  }

  async findByCompany(companyId: string): Promise<LedgerEntry[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => AccountingMapper.toLedgerDomain(m));
  }
}
