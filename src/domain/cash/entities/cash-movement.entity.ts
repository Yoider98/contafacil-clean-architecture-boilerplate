import {DomainEntity} from '../../shared/domain.entity';
import {CashMovementType} from '../enums/cash-movement-type.enum';

export class CashMovement extends DomainEntity {
  cashRegisterId: string;
  type: CashMovementType;
  amount: number;
  category?: string;
  referenceType?: string;
  referenceId?: string;
  createdAt?: Date;

  constructor(data?: Partial<CashMovement>) {
    super(data);
  }
}
