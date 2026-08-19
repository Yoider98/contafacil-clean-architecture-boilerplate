import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Purchase} from '../../../domain/purchases/entities/purchase.entity';
import {IPurchaseRepository} from '../../../domain/purchases/repositories/purchase.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {PurchaseMapper} from '../mappers/purchase.mapper';
import {PurchaseModel} from '../models/purchase.model';

export class PurchaseRepository implements IPurchaseRepository {
  private lbRepository: DefaultCrudRepository<PurchaseModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(PurchaseModel, dataSource);
  }

  async create(purchase: Purchase, options?: any): Promise<Purchase>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<Purchase>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findAll(companyId: string): Promise<Purchase[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => PurchaseMapper.toDomain(m));
  }
}
