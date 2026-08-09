import {DomainEntity} from '../../shared/domain.entity';

export class Account extends DomainEntity {
  code: string;
  name: string;
  type?: string;
  description?: string;

  constructor(data?: Partial<Account>) {
    super(data);
  }
}
