import {v4 as uuidv4} from 'uuid';
import {
  Receivable,
  ReceivableStatus,
} from '../../../domain/receivables/entities/receivable.entity';
import ReceivableModel from '../models/receivable.model';

export class ReceivableMapper {
  static toPersistence(domain: Receivable): ReceivableModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toDomain(model: ReceivableModel): Receivable  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }
}

export default ReceivableMapper;
