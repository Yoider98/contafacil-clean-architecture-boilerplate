import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FiscalRegime} from '../../../domain/accounting/entities/fiscal-regime.entity';
import {IFiscalRegimeRepository} from '../../../domain/accounting/repositories/accounting.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {AccountingMapper} from '../mappers/accounting.mapper';
import {FiscalRegimeModel} from '../models/fiscal-regime.model';

export class FiscalRegimeRepository implements IFiscalRegimeRepository {
  private lbRepository: DefaultCrudRepository<FiscalRegimeModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(
      FiscalRegimeModel,
      dataSource,
    );
  }

  async create(regime: FiscalRegime): Promise<FiscalRegime>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findAll(companyId: string): Promise<FiscalRegime[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => AccountingMapper.toFiscalRegimeDomain(m));
  }

  async findByCode(
    companyId: string,
    code: string,
  ): Promise<FiscalRegime | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    if (!models || models.length === 0) return null;
    return AccountingMapper.toFiscalRegimeDomain(models[0]);
  }

  async findById(id: string): Promise<FiscalRegime>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
