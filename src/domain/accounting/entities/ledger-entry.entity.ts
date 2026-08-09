import {DomainEntity} from '../../shared/domain.entity';

export class LedgerEntry extends DomainEntity {
  accountId: string;
  amount: number;
  referenceType: string;
  referenceId: string;
  thirdPartyId?: string;
  createdAt: Date;

  constructor(data?: Partial<LedgerEntry>) {
    super(data);
    this.accountId = data?.accountId ?? '';
    this.amount = data?.amount ?? 0;
    this.referenceType = data?.referenceType ?? '';
    this.referenceId = data?.referenceId ?? '';
    this.thirdPartyId = data?.thirdPartyId;
    this.createdAt = data?.createdAt ?? new Date();
  }
}
