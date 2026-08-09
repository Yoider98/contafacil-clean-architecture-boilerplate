import {LedgerEntry} from '../../../domain/accounting/entities/ledger-entry.entity';
import {
  IAccountRepository,
  ILedgerEntryRepository,
} from '../../../domain/accounting/repositories/accounting.repository.interface';

export interface CreateLedgerEntryDto {
  companyId: string;
  accountId: string;
  amount: number;
  referenceType?: string;
  referenceId?: string;
  thirdPartyId?: string;
}

export class CreateLedgerEntryUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly ledgerEntryRepository: ILedgerEntryRepository,
  )  { /* Inyectado por constructor */ }

  async execute(dto: CreateLedgerEntryDto): Promise<LedgerEntry>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }),
    );
  }
}
