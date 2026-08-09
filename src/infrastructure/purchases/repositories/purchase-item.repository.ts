import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PurchaseItem} from '../../../domain/purchases/entities/purchase-item.entity';
import {IPurchaseItemRepository} from '../../../domain/purchases/repositories/purchase.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {PurchaseMapper} from '../mappers/purchase.mapper';
import {PurchaseItemModel} from '../models/purchase-item.model';

export class PurchaseItemRepository implements IPurchaseItemRepository {
  private lbRepository: DefaultCrudRepository<PurchaseItemModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(
      PurchaseItemModel,
      dataSource,
    );
  }

  async create(item: PurchaseItem): Promise<PurchaseItem>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findByPurchaseId(purchaseId: string): Promise<PurchaseItem[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => PurchaseMapper.toItemDomain(m));
  }
}
