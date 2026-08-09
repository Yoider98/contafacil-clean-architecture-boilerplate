import {DomainEntity} from '../../shared/domain.entity';

export class Sales extends DomainEntity {
  paymentMethod: string;
  total: number;
  createdAt: Date;

  constructor(data?: Partial<Sales>) {
    super(data);
  }
}
