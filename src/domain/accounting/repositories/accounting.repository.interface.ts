import {Account} from '../entities/account.entity';
import {FiscalRegime} from '../entities/fiscal-regime.entity';
import {LedgerEntry} from '../entities/ledger-entry.entity';

export interface IAccountRepository {
  create(account: Account): Promise<Account>;
  findById(id: string): Promise<Account>;
  findAll(companyId: string): Promise<Account[]>;
  findByCode(companyId: string, code: string): Promise<Account | null>;
}

export interface IFiscalRegimeRepository {
  create(regime: FiscalRegime): Promise<FiscalRegime>;
  findById(id: string): Promise<FiscalRegime>;
  findAll(companyId: string): Promise<FiscalRegime[]>;
  findByCode(companyId: string, code: string): Promise<FiscalRegime | null>;
}

export interface ILedgerEntryRepository {
  create(entry: LedgerEntry, options?: any): Promise<LedgerEntry>;
  findByAccount(accountId: string): Promise<LedgerEntry[]>;
  findByCompany(companyId: string): Promise<LedgerEntry[]>;
}
