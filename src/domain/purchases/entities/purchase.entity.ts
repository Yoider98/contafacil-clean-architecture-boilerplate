import {DomainEntity} from '../../shared/domain.entity';

export class Purchase extends DomainEntity {
  supplier: string;
  total: number;
  createdAt: Date;

  constructor(data?: Partial<Purchase>) {
    super(data);
  }
}
