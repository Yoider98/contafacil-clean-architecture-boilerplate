import {v4 as uuidv4} from 'uuid';
import {
  Invoice,
  InvoiceItem,
} from '../../../domain/invoices/entities/invoice.entity';
import DocumentStatus from '../../../domain/shared/enums/document-status.enum';
import DianStatus from '../../../domain/invoices/enums/dian-status.enum';
import {InvoiceModel} from '../models/invoice.model';

export class InvoiceMapper {
  static toDomain(model: InvoiceModel): Invoice  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toPersistence(entity: Invoice): InvoiceModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}

export default InvoiceMapper;
