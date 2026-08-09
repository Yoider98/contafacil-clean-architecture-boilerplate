import {v4 as uuidv4} from 'uuid';
import {CashRegister} from '../../../domain/cash/entities/cash-register.entity';
import {CashMovement} from '../../../domain/cash/entities/cash-movement.entity';
import {CashRegisterStatus} from '../../../domain/cash/enums/cash-register-status.enum';
import {CashMovementType} from '../../../domain/cash/enums/cash-movement-type.enum';
import {CashRegisterModel} from '../models/cash-register.model';
import {CashMovementModel} from '../models/cash-movement.model';

export class CashMapper {
  static toRegisterDomain(model: CashRegisterModel): CashRegister  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toRegisterPersistence(entity: CashRegister): CashRegisterModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  static toMovementDomain(model: CashMovementModel): CashMovement  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toMovementPersistence(entity: CashMovement): CashMovementModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
