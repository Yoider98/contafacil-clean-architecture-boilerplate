import {inject} from '@loopback/core';
import {DefaultCrudRepository, AnyObject} from '@loopback/repository';
import ReceivableModel from '../models/receivable.model';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {IReceivableRepository} from '../../../domain/receivables/repositories/receivable.repository.interface';
import ReceivableMapper from '../mappers/receivable.mapper';
import {Receivable} from '../../../domain/receivables/entities/receivable.entity';

export class ReceivableRepository implements IReceivableRepository {
  private lbRepository: DefaultCrudRepository<
    ReceivableModel,
    typeof ReceivableModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(ReceivableModel, dataSource);
  }

  async create(receivable: Receivable): Promise<Receivable>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<Receivable | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return model ? ReceivableMapper.toDomain(model) : null;
  }

  async find(filter?: object): Promise<Receivable[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findByCompany(companyId: string): Promise<Receivable[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(ReceivableMapper.toDomain);
  }

  async findOpenByThirdParty(
    companyId: string,
    thirdPartyId: string,
  ): Promise<Receivable[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return models.map(ReceivableMapper.toDomain);
  }

  async update(receivable: Receivable): Promise<Receivable>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
