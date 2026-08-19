import {DomainEntity} from '../domain.entity';
import {MasterlistCategory} from '../enums/masterlist-category.enum';

export class Masterlist extends DomainEntity {
  category: MasterlistCategory;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  validFrom?: Date;
  validTo?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<Masterlist>) {
    super(data);
    this.isActive = data?.isActive ?? true;
    this.metadata = data?.metadata ?? {};
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }
}
