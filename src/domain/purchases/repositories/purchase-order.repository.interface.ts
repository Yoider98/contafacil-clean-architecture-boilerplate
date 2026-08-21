import {PurchaseOrder} from '../entities/purchase-order.entity';
import {PurchaseOrderItem} from '../entities/purchase-order-item.entity';

export interface IPurchaseOrderRepository {
  create(purchaseOrder: PurchaseOrder, options?: any): Promise<PurchaseOrder>;
  findById(id: string): Promise<PurchaseOrder>;
  findAll(companyId: string): Promise<PurchaseOrder[]>;
  update(purchaseOrder: PurchaseOrder, options?: any): Promise<void>;
}

export interface IPurchaseOrderItemRepository {
  create(item: PurchaseOrderItem, options?: any): Promise<PurchaseOrderItem>;
  findByPurchaseOrderId(purchaseOrderId: string): Promise<PurchaseOrderItem[]>;
}
