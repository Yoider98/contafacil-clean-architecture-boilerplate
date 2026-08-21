import {DomainEntity} from '../../shared/domain.entity';

export class Department extends DomainEntity {
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<Department>) {
    super(data);
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }
}
