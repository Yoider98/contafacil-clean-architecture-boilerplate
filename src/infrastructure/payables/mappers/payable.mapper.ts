import {v4 as uuidv4} from 'uuid';
import {
  Payable,
  PayableStatus,
} from '../../../domain/payables/entities/payable.entity';
import PayableModel from '../models/payable.model';

export class PayableMapper {
  static toPersistence(domain: Payable): PayableModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toDomain(model: PayableModel): Payable  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }
}

export default PayableMapper;
