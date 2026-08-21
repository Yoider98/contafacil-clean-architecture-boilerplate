import {InventoryMovement} from '../entities/inventory-movement.entity';
import {AnyObject} from '@loopback/repository';

export interface IInventoryRepository {
  registerMovement(
    movement: InventoryMovement,
    options?: AnyObject,
  ): Promise<InventoryMovement>;
  calculateStock(
    companyId: string,
    productId: string,
    warehouseId: string,
    options?: AnyObject,
  ): Promise<number>;
  findMovementsByCompany(
    companyId: string,
    options?: AnyObject,
  ): Promise<InventoryMovement[]>;
}
