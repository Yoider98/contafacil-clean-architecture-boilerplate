import {DomainEntity} from '../../shared/domain.entity';

export class PurchaseOrderItem extends DomainEntity {
  companyId: string;
  purchaseOrderId: string;
  productId: string;
  quantity: number;
  cost: number;
  warehouseId: string;
  taxRate: number;
  taxAmount: number;
  retentionRate: number;
  retentionAmount: number;

  constructor(data?: Partial<PurchaseOrderItem>) {
    super(data);
    this.quantity = data?.quantity ?? 0;
    this.cost = data?.cost ?? 0;
    this.taxRate = data?.taxRate ?? 0;
    this.taxAmount = data?.taxAmount ?? 0;
    this.retentionRate = data?.retentionRate ?? 0;
    this.retentionAmount = data?.retentionAmount ?? 0;
  }
}
