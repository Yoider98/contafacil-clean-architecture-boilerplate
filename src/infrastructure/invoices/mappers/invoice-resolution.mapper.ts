import {v4 as uuidv4} from 'uuid';
import {
  InvoiceResolution,
  InvoiceDocumentType,
} from '../../../domain/invoices/entities/invoice-resolution.entity';
import DocumentStatus from '../../../domain/shared/enums/document-status.enum';
import {InvoiceResolutionModel} from '../models/invoice-resolution.model';

export class InvoiceResolutionMapper {
  static toDomain(model: InvoiceResolutionModel): InvoiceResolution  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toPersistence(entity: InvoiceResolution): InvoiceResolutionModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
