import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SalesItem} from '../../../domain/sales/entities/sales-item.entity';
import {ISalesItemRepository} from '../../../domain/sales/repositories/sales.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {SalesMapper} from '../mappers/sales.mapper';
import {SalesItemModel} from '../models/sales-item.model';

export class SalesItemRepository implements ISalesItemRepository {
  private lbRepository: DefaultCrudRepository<SalesItemModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(SalesItemModel, dataSource);
  }

  async create(salesItem: SalesItem): Promise<SalesItem>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<SalesItem>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findAll(): Promise<SalesItem[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findBySalesId(salesId: string): Promise<SalesItem[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => SalesMapper.toSalesItemDomain(m));
  }
}
