import {v4 as uuidv4} from 'uuid';
import {QuotationItemModel} from '../models/quotation-item.model';
import {QuotationModel} from '../models/quotation.model';
import {Quotation} from '../../../domain/sales/entities/quotation.entity';
import {QuotationItem} from '../../../domain/sales/entities/quotation-item.entity';

export class QuotationMapper {
  static toQuotationDomain(model: QuotationModel): Quotation  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toQuotationPersistence(entity: Quotation): QuotationModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  static toQuotationItemDomain(model: QuotationItemModel): QuotationItem  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toQuotationItemPersistence(entity: QuotationItem): QuotationItemModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
