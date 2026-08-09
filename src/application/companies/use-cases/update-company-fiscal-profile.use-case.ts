import {Company} from '../../../domain/companies/entities/company.entity';
import {ICompanyRepository} from '../../../domain/companies/repositories/company.repository.interface';
import {
  PersonType,
  TaxRegime,
  CompanyType,
} from '../../../domain/companies/enums/company-fiscal.enum';

export interface UpdateCompanyFiscalProfileDTO {
  companyId: string;
  nit?: string;
  personType?: PersonType;
  taxRegime?: TaxRegime;
  economicActivityCode?: string;
  companyType?: CompanyType;
  merchantRegister?: string;
  taxObligations?: string[];
}

export class UpdateCompanyFiscalProfileUseCase {
  constructor(private companyRepository: ICompanyRepository)  { /* Inyectado por constructor */ }

  async execute(dto: UpdateCompanyFiscalProfileDTO): Promise<Company>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    const company = await this.companyRepository.findById(dto.companyId);
    if (!company)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    company.updateFiscalProfile({
      nit: dto.nit,
      personType: dto.personType,
      taxRegime: dto.taxRegime,
      economicActivityCode: dto.economicActivityCode,
      companyType: dto.companyType,
      merchantRegister: dto.merchantRegister,
      taxObligations: dto.taxObligations,
    });

    return this.companyRepository.update(company);
  }
}
