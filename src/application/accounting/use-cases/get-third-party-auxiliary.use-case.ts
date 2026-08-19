import {IAccountRepository, ILedgerEntryRepository} from '../../../domain/accounting/repositories/accounting.repository.interface';

export interface AuxiliaryMovement {
  id: string;
  createdAt: Date;
  referenceType: string;
  referenceId: string;
  accountCode: string;
  accountName: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
}

export interface ThirdPartyAuxiliaryReport {
  companyId: string;
  thirdPartyId: string;
  initialBalance: number;
  movements: AuxiliaryMovement[];
  finalBalance: number;
}

export class GetThirdPartyAuxiliaryUseCase {
  constructor(
    private accountRepository: IAccountRepository,
    private ledgerEntryRepository: ILedgerEntryRepository,
  )  { /* Inyectado por constructor */ }

  async execute(
    companyId: string,
    thirdPartyId: string,
    startDate?: string,
    endDate?: string,
  ): Promise<ThirdPartyAuxiliaryReport>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }>();
    accounts.forEach(acc => accountMap.set(acc.id, acc));

    // Filter entries belonging to this third party
    const tpEntries = entries.filter(e => e.thirdPartyId === thirdPartyId);

    let initialBalance = 0;
    const movements: AuxiliaryMovement[] = [];

    for (const e of tpEntries)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else if (end && entryDate > end)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else {
        const acc = accountMap.get(e.accountId);
        movements.push({
          id: e.id,
          createdAt: e.createdAt,
          referenceType: e.referenceType,
          referenceId: e.referenceId,
          accountCode: acc?.code ?? 'UNKNOWN',
          accountName: acc?.name ?? 'UNKNOWN',
          amount: Math.abs(e.amount),
          type: e.amount > 0 ? 'DEBIT' : 'CREDIT',
        });
      }
    }

    // Sort movements by date
    movements.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    // Calculate final balance: initialBalance + credits - debits
    // Note: in movements array we store Math.abs(amount). Let's sum the raw values.
    const netPeriodChange = tpEntries
      .filter(e => {
        const entryDate = new Date(e.createdAt);
        return (!start || entryDate >= start) && (!end || entryDate <= end);
      })
      .reduce((sum, e) => sum + e.amount, 0);

    const finalBalance = initialBalance + netPeriodChange;

    return {
      companyId,
      thirdPartyId,
      initialBalance,
      movements,
      finalBalance,
    };
  }
}
