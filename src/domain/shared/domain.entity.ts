export abstract class DomainEntity {
  id: string;
  companyId: string;

  constructor(data?: Partial<DomainEntity>) {
    Object.assign(this, data);
  }
}
