import {DomainEntity} from '../../shared/domain.entity';

export class FiscalRegime extends DomainEntity {
  code: string;
  name: string;
  description?: string;
  active?: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(data?: Partial<FiscalRegime>) {
    super(data);
    if (this.active === undefined || this.active === null) {
      this.active = true;
    }
  }
}
