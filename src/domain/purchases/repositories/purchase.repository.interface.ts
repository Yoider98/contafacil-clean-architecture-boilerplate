import {Purchase} from '../entities/purchase.entity';
import {PurchaseItem} from '../entities/purchase-item.entity';

export interface IPurchaseRepository {
  create(purchase: Purchase, options?: any): Promise<Purchase>;
  findById(id: string): Promise<Purchase>;
  findAll(companyId: string): Promise<Purchase[]>;
}

export interface IPurchaseItemRepository {
  create(item: PurchaseItem, options?: any): Promise<PurchaseItem>;
  findByPurchaseId(purchaseId: string): Promise<PurchaseItem[]>;
}
