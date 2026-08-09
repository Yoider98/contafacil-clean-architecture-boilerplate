import {DomainEntity} from '../../shared/domain.entity';

export enum AccountingPeriodStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export class AccountingPeriod extends DomainEntity {
  companyId: string;
  fromDate: Date;
  toDate: Date;
  status: AccountingPeriodStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<AccountingPeriod>) {
    super(data);
    this.status = data?.status ?? AccountingPeriodStatus.OPEN;
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }

  close(): void {
    if (this.status === AccountingPeriodStatus.CLOSED) {
      throw new Error('Periodo ya está cerrado');
    }
    this.status = AccountingPeriodStatus.CLOSED;
    this.updatedAt = new Date();
  }
}
