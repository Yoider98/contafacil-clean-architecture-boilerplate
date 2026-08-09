import {inject} from '@loopback/core';
import {DefaultCrudRepository, AnyObject} from '@loopback/repository';
import PayableModel from '../models/payable.model';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {IPayableRepository} from '../../../domain/payables/repositories/payable.repository.interface';
import PayableMapper from '../mappers/payable.mapper';
import {Payable} from '../../../domain/payables/entities/payable.entity';

export class PayableRepository implements IPayableRepository {
  private lbRepository: DefaultCrudRepository<
    PayableModel,
    typeof PayableModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(PayableModel, dataSource);
  }

  async create(payable: Payable): Promise<Payable>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<Payable | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return model ? PayableMapper.toDomain(model) : null;
  }

  async find(filter?: object): Promise<Payable[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findByCompany(companyId: string): Promise<Payable[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(PayableMapper.toDomain);
  }

  async findOpenByThirdParty(
    companyId: string,
    thirdPartyId: string,
  ): Promise<Payable[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return models.map(PayableMapper.toDomain);
  }

  async update(payable: Payable): Promise<Payable>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
