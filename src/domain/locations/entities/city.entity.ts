import {DomainEntity} from '../../shared/domain.entity';

export class City extends DomainEntity {
  code: string;
  name: string;
  departmentCode: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<City>) {
    super(data);
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }
}
