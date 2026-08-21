import {DomainEntity} from '../../shared/domain.entity';

export class QuotationItem extends DomainEntity {
  companyId: string;
  quotationId: string;
  productId: string;
  quantity: number;
  price: number;
  taxRate: number;
  taxAmount: number;
  retentionRate: number;
  retentionAmount: number;

  constructor(data?: Partial<QuotationItem>) {
    super(data);
    this.quantity = data?.quantity ?? 0;
    this.price = data?.price ?? 0;
    this.taxRate = data?.taxRate ?? 0;
    this.taxAmount = data?.taxAmount ?? 0;
    this.retentionRate = data?.retentionRate ?? 0;
    this.retentionAmount = data?.retentionAmount ?? 0;
  }
}
