import {ThirdParty} from '../entities/third-party.entity';

export interface IThirdPartyRepository {
  create(thirdParty: ThirdParty): Promise<ThirdParty>;
  findById(id: string, companyId: string): Promise<ThirdParty | null>;
  findByIdentification(
    companyId: string,
    documentType: string,
    identificationNumber: string,
  ): Promise<ThirdParty | null>;
  find(
    companyId: string,
    filter?: {
      role?: string;
      search?: string;
      isActive?: boolean;
    },
  ): Promise<ThirdParty[]>;
  update(thirdParty: ThirdParty): Promise<ThirdParty>;
  delete(id: string, companyId: string): Promise<boolean>;
}
