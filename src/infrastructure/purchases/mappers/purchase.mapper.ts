import {v4 as uuidv4} from 'uuid';
import {Purchase} from '../../../domain/purchases/entities/purchase.entity';
import {PurchaseItem} from '../../../domain/purchases/entities/purchase-item.entity';
import {PurchaseModel} from '../models/purchase.model';
import {PurchaseItemModel} from '../models/purchase-item.model';

export class PurchaseMapper {
  static toDomain(model: PurchaseModel): Purchase  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toPersistence(entity: Purchase): PurchaseModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  static toItemDomain(model: PurchaseItemModel): PurchaseItem  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toItemPersistence(entity: PurchaseItem): PurchaseItemModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
