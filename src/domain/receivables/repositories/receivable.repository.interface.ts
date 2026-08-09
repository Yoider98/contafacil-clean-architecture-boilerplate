import {Receivable} from '../entities/receivable.entity';

export interface IReceivableRepository {
  create(receivable: Receivable): Promise<Receivable>;
  findById(id: string): Promise<Receivable | null>;
  find(filter?: object): Promise<Receivable[]>;
  findByCompany(companyId: string): Promise<Receivable[]>;
  findOpenByThirdParty(
    companyId: string,
    thirdPartyId: string,
  ): Promise<Receivable[]>;
  update(receivable: Receivable): Promise<Receivable>;
}

export default IReceivableRepository;
