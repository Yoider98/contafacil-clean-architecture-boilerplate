import {AccountingPeriod} from '../entities/accounting-period.entity';

export interface IAccountingPeriodRepository {
  create(period: AccountingPeriod): Promise<AccountingPeriod>;
  findById(id: string): Promise<AccountingPeriod | null>;
  findOpenByCompany(companyId: string): Promise<AccountingPeriod | null>;
  checkPeriodOpen(companyId: string, date: Date): Promise<boolean>;
  close(period: AccountingPeriod): Promise<AccountingPeriod>;
  findAllByCompany(companyId: string, options?: any): Promise<AccountingPeriod[]>;
  save(period: AccountingPeriod, options?: any): Promise<AccountingPeriod>;
}

export default IAccountingPeriodRepository;
