import {DomainEntity} from '../../shared/domain.entity';

export class PurchaseItem extends DomainEntity {
  companyId: string;
  purchaseId: string;
  productId: string;
  quantity: number;
  cost: number;
  warehouseId: string;
  taxRate: number;
  taxAmount: number;
  retentionRate: number;
  retentionAmount: number;

  constructor(data?: Partial<PurchaseItem>) {
    super(data);
    this.taxRate = data?.taxRate ?? 0;
    this.taxAmount = data?.taxAmount ?? 0;
    this.retentionRate = data?.retentionRate ?? 0;
    this.retentionAmount = data?.retentionAmount ?? 0;
  }
}
