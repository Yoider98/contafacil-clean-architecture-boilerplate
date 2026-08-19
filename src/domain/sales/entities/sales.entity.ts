import {DomainEntity} from '../../shared/domain.entity';

export class Sales extends DomainEntity {
  companyId: string;
  paymentMethod: string;
  subtotal: number;
  taxTotal: number;
  retentionTotal: number;
  total: number;
  createdAt: Date;

  constructor(data?: Partial<Sales>) {
    super(data);
    this.subtotal = data?.subtotal ?? 0;
    this.taxTotal = data?.taxTotal ?? 0;
    this.retentionTotal = data?.retentionTotal ?? 0;
    this.total = data?.total ?? 0;
    if (!this.createdAt) this.createdAt = new Date();
  }
}
