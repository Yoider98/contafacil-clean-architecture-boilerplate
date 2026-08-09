import {v4 as uuidv4} from 'uuid';
import {InventoryMovement} from '../../../domain/inventory/entities/inventory-movement.entity';
import {Product} from '../../../domain/inventory/entities/product.entity';
import {Warehouse} from '../../../domain/inventory/entities/warehouse.entity';
import {MovementType} from '../../../domain/inventory/enums/movement-type.enum';
import {ProductType} from '../../../domain/inventory/enums/product-type.enum';
import {InventoryMovementModel} from '../models/inventory-movement.model';
import {ProductModel} from '../models/product.model';
import {WarehouseModel} from '../models/warehouse.model';

export class InventoryMapper {
  static toProductDomain(model: ProductModel): Product  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toProductPersistence(entity: Product): ProductModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  static toWarehouseDomain(model: WarehouseModel): Warehouse  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toWarehousePersistence(entity: Warehouse): WarehouseModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  static toMovementDomain(model: InventoryMovementModel): InventoryMovement  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toMovementPersistence(
    entity: InventoryMovement,
  ): InventoryMovementModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
