import {LedgerEntry} from '../../../domain/accounting/entities/ledger-entry.entity';
import {
  IAccountRepository,
  ILedgerEntryRepository,
} from '../../../domain/accounting/repositories/accounting.repository.interface';
import {IAccountingPeriodRepository} from '../../../domain/accounting/repositories/accounting-period.repository.interface';
import {PostgresDataSource} from '../../../infrastructure/database/datasources/postgres.datasource';
import {IsolationLevel} from '@loopback/repository';

export interface CreateJournalLineDto {
  accountId: string;
  debit: number;
  credit: number;
  description?: string;
  thirdPartyId?: string;
}

export interface CreateJournalTransactionDto {
  companyId: string;
  concept: string;
  reference: string;
  date: string;
  lines: CreateJournalLineDto[];
}

export class CreateJournalTransactionUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly ledgerEntryRepository: ILedgerEntryRepository,
    private readonly accountingPeriodRepository: IAccountingPeriodRepository,
    private readonly dataSource: PostgresDataSource,
  )  { /* Inyectado por constructor */ }

  async execute(dto: CreateJournalTransactionDto): Promise<LedgerEntry[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    const transactionDate = dto.date ? new Date(dto.date) : new Date();

    // 1. Validar Período Abierto
    const isPeriodOpen = await this.accountingPeriodRepository.checkPeriodOpen(
      dto.companyId,
      transactionDate,
    );
    if (!isPeriodOpen)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    // 2. Validar Partida Doble
    let totalDebit = 0;
    let totalCredit = 0;

    for (const line of dto.lines)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
      if (line.debit > 0 && line.credit > 0)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
      totalDebit += line.debit;
      totalCredit += line.credit;
    }

    // Permitir una pequeña tolerancia por decimales (ej. menor a 0.01)
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      throw new Error(
        `El asiento contable no está balanceado. Débitos: ${totalDebit}, Créditos: ${totalCredit}`,
      );
    }

    // 3. Iniciar Transacción PostgreSQL
    const tx = await this.dataSource.beginTransaction(
      IsolationLevel.READ_COMMITTED,
    );

    const savedEntries: LedgerEntry[] = [];

    try {
      for (const line of dto.lines)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } no pertenece a esta empresa`);
        }

        // Negativos son débitos, positivos son créditos
        const amount = line.debit > 0 ? -line.debit : line.credit;

        const entry = await this.ledgerEntryRepository.create(
          new LedgerEntry({
            companyId: dto.companyId,
            accountId: line.accountId,
            amount: amount,
            referenceType: 'MANUAL_JOURNAL',
            referenceId: dto.reference,
            thirdPartyId: line.thirdPartyId,
            createdAt: transactionDate,
          }),
          {transaction: tx},
        );

        savedEntries.push(entry);
      }

      await tx.commit();
      return savedEntries;
    } catch (err: unknown)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
  }
}
