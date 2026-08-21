import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PurchaseOrderItem} from '../../../domain/purchases/entities/purchase-order-item.entity';
import {IPurchaseOrderItemRepository} from '../../../domain/purchases/repositories/purchase-order.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {PurchaseOrderMapper} from '../mappers/purchase-order.mapper';
import {PurchaseOrderItemModel} from '../models/purchase-order-item.model';

export class PurchaseOrderItemRepository implements IPurchaseOrderItemRepository {
  private lbRepository: DefaultCrudRepository<PurchaseOrderItemModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(PurchaseOrderItemModel, dataSource);
  }

  async create(item: PurchaseOrderItem, options?: any): Promise<PurchaseOrderItem>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findByPurchaseOrderId(purchaseOrderId: string): Promise<PurchaseOrderItem[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => PurchaseOrderMapper.toItemDomain(m));
  }
}
