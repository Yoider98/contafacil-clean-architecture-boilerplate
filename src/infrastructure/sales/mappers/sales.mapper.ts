import {v4 as uuidv4} from 'uuid';
import {SalesItemModel} from '../models/sales-item.model';
import {SalesModel} from '../models/sales.model';
import {Sales} from '../../../domain/sales/entities/sales.entity';
import {SalesItem} from '../../../domain/sales/entities/sales-item.entity';

export class SalesMapper {
  static toSalesDomain(model: SalesModel): Sales  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toSalesPersistence(entity: Sales): SalesModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  static toSalesItemDomain(model: SalesItemModel): SalesItem  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toSalesItemPersistence(entity: SalesItem): SalesItemModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
