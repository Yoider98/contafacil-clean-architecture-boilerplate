import {DomainEntity} from '../../shared/domain.entity';
import {UserRole} from '../enums/user-role.enum';

export class User extends DomainEntity {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data?: Partial<User>) {
    super(data);
    this.permissions = data?.permissions || [];
  }
}
