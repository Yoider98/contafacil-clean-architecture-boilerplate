import {IAccountRepository, ILedgerEntryRepository} from '../../../domain/accounting/repositories/accounting.repository.interface';

export interface TrialBalanceItem {
  accountCode: string;
  accountName: string;
  initialBalance: number;
  debits: number;
  credits: number;
  finalBalance: number;
}

export class GetTrialBalanceUseCase {
  constructor(
    private accountRepository: IAccountRepository,
    private ledgerEntryRepository: ILedgerEntryRepository,
  )  { /* Inyectado por constructor */ }

  async execute(
    companyId: string,
    startDate?: string,
    endDate?: string,
  ): Promise<TrialBalanceItem[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else if (end && entryDate > end)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else {
          // inside range
          if (e.amount < 0)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else {
            credits += e.amount;
          }
        }
      }

      // If no start date was filtered, initial balance remains 0
      const finalBalance = initialBalance + credits - debits;

      return {
        accountCode: acc.code,
        accountName: acc.name,
        initialBalance,
        debits,
        credits,
        finalBalance,
      };
    });

    return report.sort((a, b) => a.accountCode.localeCompare(b.accountCode));
  }
}
