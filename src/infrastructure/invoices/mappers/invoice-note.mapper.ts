import {v4 as uuidv4} from 'uuid';
import {InvoiceNote, InvoiceNoteType} from '../../../domain/invoices/entities/invoice-note.entity';
import {InvoiceNoteModel} from '../models/invoice-note.model';
import DianStatus from '../../../domain/invoices/enums/dian-status.enum';
import {InvoiceItem} from '../../../domain/invoices/entities/invoice.entity';

export class InvoiceNoteMapper {
  static toDomain(model: InvoiceNoteModel): InvoiceNote  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toPersistence(entity: InvoiceNote): InvoiceNoteModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
