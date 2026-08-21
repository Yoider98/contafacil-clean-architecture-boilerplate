import {v4 as uuidv4} from 'uuid';
import {PurchaseOrder} from '../../../domain/purchases/entities/purchase-order.entity';
import {PurchaseOrderItem} from '../../../domain/purchases/entities/purchase-order-item.entity';
import {PurchaseOrderModel} from '../models/purchase-order.model';
import {PurchaseOrderItemModel} from '../models/purchase-order-item.model';

export class PurchaseOrderMapper {
  static toDomain(model: PurchaseOrderModel): PurchaseOrder  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toPersistence(entity: PurchaseOrder): PurchaseOrderModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  static toItemDomain(model: PurchaseOrderItemModel): PurchaseOrderItem  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toItemPersistence(entity: PurchaseOrderItem): PurchaseOrderItemModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
