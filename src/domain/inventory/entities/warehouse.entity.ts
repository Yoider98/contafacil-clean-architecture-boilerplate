import {DomainEntity} from '../../shared/domain.entity';

export class Warehouse extends DomainEntity {
  name: string;
  location?: string;
  companyId: string;
  createdAt: Date;

  constructor(data?: Partial<Warehouse>) {
    super(data);
  }
}
