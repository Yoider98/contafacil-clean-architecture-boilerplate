import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PurchaseOrder} from '../../../domain/purchases/entities/purchase-order.entity';
import {IPurchaseOrderRepository} from '../../../domain/purchases/repositories/purchase-order.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {PurchaseOrderMapper} from '../mappers/purchase-order.mapper';
import {PurchaseOrderModel} from '../models/purchase-order.model';

export class PurchaseOrderRepository implements IPurchaseOrderRepository {
  private lbRepository: DefaultCrudRepository<PurchaseOrderModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(PurchaseOrderModel, dataSource);
  }

  async create(purchaseOrder: PurchaseOrder, options?: any): Promise<PurchaseOrder>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<PurchaseOrder>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findAll(companyId: string): Promise<PurchaseOrder[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => PurchaseOrderMapper.toDomain(m));
  }

  async update(purchaseOrder: PurchaseOrder, options?: any): Promise<void>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
