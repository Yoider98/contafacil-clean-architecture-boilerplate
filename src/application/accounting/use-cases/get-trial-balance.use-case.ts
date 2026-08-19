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
          if (e.amount > 0)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else {
            credits += Math.abs(e.amount);
          }
        }
      }

      // Determinar saldo final basado en la naturaleza de la cuenta (PUC colombiano)
      const firstDigit = acc.code.charAt(0);
      const isDebitNature = ['1', '5', '6', '7', '8'].includes(firstDigit);
      const finalBalance = isDebitNature
        ? initialBalance + debits - credits
        : initialBalance + credits - debits;

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
