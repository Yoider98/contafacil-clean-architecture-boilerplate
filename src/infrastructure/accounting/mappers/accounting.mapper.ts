import {v4 as uuidv4} from 'uuid';
import {Account} from '../../../domain/accounting/entities/account.entity';
import {FiscalRegime} from '../../../domain/accounting/entities/fiscal-regime.entity';
import {LedgerEntry} from '../../../domain/accounting/entities/ledger-entry.entity';
import {AccountModel} from '../models/account.model';
import {FiscalRegimeModel} from '../models/fiscal-regime.model';
import {LedgerEntryModel} from '../models/ledger-entry.model';

export class AccountingMapper {
  static toAccountDomain(model: AccountModel): Account  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toAccountPersistence(entity: Account): AccountModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  static toFiscalRegimeDomain(model: FiscalRegimeModel): FiscalRegime  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toFiscalRegimePersistence(entity: FiscalRegime): FiscalRegimeModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  static toLedgerDomain(model: LedgerEntryModel): LedgerEntry  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toLedgerPersistence(entity: LedgerEntry): LedgerEntryModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
