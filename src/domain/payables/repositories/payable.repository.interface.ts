import {Payable} from '../entities/payable.entity';

export interface IPayableRepository {
  create(payable: Payable): Promise<Payable>;
  findById(id: string): Promise<Payable | null>;
  find(filter?: object): Promise<Payable[]>;
  findByCompany(companyId: string): Promise<Payable[]>;
  findOpenByThirdParty(
    companyId: string,
    thirdPartyId: string,
  ): Promise<Payable[]>;
  update(payable: Payable): Promise<Payable>;
}

export default IPayableRepository;
