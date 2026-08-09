import {DomainEntity} from '../../shared/domain.entity';
import {PersonType, TaxRegime} from '../../companies/enums/company-fiscal.enum';
import {calculateDIANDigitVerification} from '../../../shared/utils/dian-dv.calculator';

export enum DocumentType {
  NIT = 'NIT',
  CC = 'CC',
  CE = 'CE',
  PASAPORTE = 'PASAPORTE',
  TI = 'TI',
}

export enum ThirdPartyRole {
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER',
  OTHER = 'OTHER',
}

export class ThirdParty extends DomainEntity {
  companyId: string;
  personType: PersonType;
  documentType: DocumentType;
  identificationNumber: string;
  dv?: string;
  name: string;
  tradeName?: string;
  roles: ThirdPartyRole[];
  taxRegime: TaxRegime;
  economicActivityCode?: string;
  address: string;
  cityCode: string;
  departmentCode: string;
  email: string;
  phone: string;
  isSelfRetainer: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<ThirdParty>) {
    super(data);
    if (this.isSelfRetainer === undefined) this.isSelfRetainer = false;
    if (this.isActive === undefined) this.isActive = true;
    if (!this.roles || this.roles.length === 0)
      this.roles = [ThirdPartyRole.CUSTOMER];
    if (!this.personType) this.personType = PersonType.NATURAL;
    if (!this.taxRegime) this.taxRegime = TaxRegime.NO_RESPONSABLE_IVA;

    if (this.documentType === DocumentType.NIT && this.identificationNumber) {
      this.dv = calculateDIANDigitVerification(this.identificationNumber);
    }
  }

  isCustomer(): boolean {
    return this.roles.includes(ThirdPartyRole.CUSTOMER);
  }

  isSupplier(): boolean {
    return this.roles.includes(ThirdPartyRole.SUPPLIER);
  }
}
