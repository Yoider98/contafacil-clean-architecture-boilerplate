import {v4 as uuidv4} from 'uuid';
import {
  AccountingPeriod,
  AccountingPeriodStatus,
} from '../../../domain/accounting/entities/accounting-period.entity';
import AccountingPeriodModel from '../models/accounting-period.model';

export class AccountingPeriodMapper {
  static toPersistence(domain: AccountingPeriod): AccountingPeriodModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toDomain(model: AccountingPeriodModel): AccountingPeriod  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }
}

export default AccountingPeriodMapper;
