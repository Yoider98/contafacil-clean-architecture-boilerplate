import {DomainEntity} from '../../shared/domain.entity';

export class Purchase extends DomainEntity {
  companyId: string;
  supplier: string;
  subtotal: number;
  taxTotal: number;
  retentionTotal: number;
  total: number;
  createdAt: Date;

  constructor(data?: Partial<Purchase>) {
    super(data);
    this.subtotal = data?.subtotal ?? 0;
    this.taxTotal = data?.taxTotal ?? 0;
    this.retentionTotal = data?.retentionTotal ?? 0;
    this.total = data?.total ?? 0;
    if (!this.createdAt) this.createdAt = new Date();
  }
}
