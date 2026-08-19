import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Masterlist} from '../../../domain/shared/entities/masterlist.entity';
import {IMasterlistRepository} from '../../../domain/shared/repositories/masterlist.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {MasterlistMapper} from '../mappers/masterlist.mapper';
import {MasterlistModel} from '../models/masterlist.model';

export class MasterlistRepository implements IMasterlistRepository {
  private lbRepository: DefaultCrudRepository<MasterlistModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(MasterlistModel, dataSource);
  }

  async create(item: Masterlist): Promise<Masterlist>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async update(item: Masterlist): Promise<Masterlist>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<Masterlist | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return model ? MasterlistMapper.toDomain(model) : null;
  }

  async findByCategory(category: string): Promise<Masterlist[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return models.map(MasterlistMapper.toDomain);
  }

  async findAll(): Promise<Masterlist[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
