import {DomainEntity} from '../../shared/domain.entity';

export class PurchaseItem extends DomainEntity {
  purchaseId: string;
  productId: string;
  quantity: number;
  cost: number;
  warehouseId: string;

  constructor(data?: Partial<PurchaseItem>) {
    super(data);
  }
}
