import {DomainEntity} from '../../shared/domain.entity';

export class SalesItem extends DomainEntity {
  salesId: string;
  productId: string;
  quantity: number;
  price: number;
  constructor(data?: Partial<SalesItem>) {
    super(data);
  }
}
