import {DomainEntity} from '../../shared/domain.entity';
import {MovementType} from '../enums/movement-type.enum';

export class InventoryMovement extends DomainEntity {
  productId: string;
  warehouseId: string; // restored
  companyId: string;
  type: MovementType;
  quantity: number;
  userId?: string; // usuario que registró el movimiento
  referenceType?: string;
  referenceId?: string;
  createdAt: Date;

  constructor(data?: Partial<InventoryMovement>) {
    super(data);
  }
}
