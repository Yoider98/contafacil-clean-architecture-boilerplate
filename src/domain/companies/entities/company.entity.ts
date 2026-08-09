import {DomainEntity} from '../../shared/domain.entity';
import {PersonType, TaxRegime, CompanyType} from '../enums/company-fiscal.enum';
import {calculateDIANDigitVerification} from '../../../shared/utils/dian-dv.calculator';

export class Company extends DomainEntity {
  name: string;
  plan: string;
  imageUrl?: string;
  phoneNumber: string;
  address: string;
  city: string;
  department: string;
  country: string;
  contactEmail: string;
  website?: string;
  postalCode?: string;

  // Campos Fiscales Colombia
  nit?: string;
  dv?: string;
  personType?: PersonType;
  taxRegime?: TaxRegime;
  economicActivityCode?: string; // Código CIIU
  companyType?: CompanyType;
  merchantRegister?: string;
  taxObligations?: string[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data?: Partial<Company>) {
    super(data);
    if (!this.companyType) {
      this.companyType = CompanyType.COMMERCIAL;
    }
    if (this.nit) {
      this.dv = calculateDIANDigitVerification(this.nit);
    }
  }

  updateFiscalProfile(profile: {
    nit?: string;
    personType?: PersonType;
    taxRegime?: TaxRegime;
    economicActivityCode?: string;
    companyType?: CompanyType;
    merchantRegister?: string;
    taxObligations?: string[];
  }): void {
    if (profile.nit !== undefined) {
      this.nit = profile.nit;
      this.dv = calculateDIANDigitVerification(profile.nit);
    }
    if (profile.personType !== undefined) this.personType = profile.personType;
    if (profile.taxRegime !== undefined) this.taxRegime = profile.taxRegime;
    if (profile.economicActivityCode !== undefined)
      this.economicActivityCode = profile.economicActivityCode;
    if (profile.companyType !== undefined)
      this.companyType = profile.companyType;
    if (profile.merchantRegister !== undefined)
      this.merchantRegister = profile.merchantRegister;
    if (profile.taxObligations !== undefined)
      this.taxObligations = profile.taxObligations;
    this.updatedAt = new Date();
  }

  updateInfo(info: {
    name?: string;
    imageUrl?: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    department?: string;
    country?: string;
    contactEmail?: string;
    website?: string;
    postalCode?: string;
  }): void {
    if (info.name !== undefined) this.name = info.name;
    if (info.imageUrl !== undefined) this.imageUrl = info.imageUrl;
    if (info.phoneNumber !== undefined) this.phoneNumber = info.phoneNumber;
    if (info.address !== undefined) this.address = info.address;
    if (info.city !== undefined) this.city = info.city;
    if (info.department !== undefined) this.department = info.department;
    if (info.country !== undefined) this.country = info.country;
    if (info.contactEmail !== undefined) this.contactEmail = info.contactEmail;
    if (info.website !== undefined) this.website = info.website;
    if (info.postalCode !== undefined) this.postalCode = info.postalCode;
    this.updatedAt = new Date();
  }
}
