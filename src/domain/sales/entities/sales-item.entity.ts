import {DomainEntity} from '../../shared/domain.entity';

export class SalesItem extends DomainEntity {
  companyId: string;
  salesId: string;
  productId: string;
  quantity: number;
  price: number;
  taxRate: number;
  taxAmount: number;
  retentionRate: number;
  retentionAmount: number;

  constructor(data?: Partial<SalesItem>) {
    super(data);
    this.taxRate = data?.taxRate ?? 0;
    this.taxAmount = data?.taxAmount ?? 0;
    this.retentionRate = data?.retentionRate ?? 0;
    this.retentionAmount = data?.retentionAmount ?? 0;
  }
}
