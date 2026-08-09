import {DomainEntity} from '../../shared/domain.entity';

export class AuthUser extends DomainEntity {
  email: string;
  password: string;

  constructor(data?: Partial<AuthUser>) {
    super(data);
  }
}
