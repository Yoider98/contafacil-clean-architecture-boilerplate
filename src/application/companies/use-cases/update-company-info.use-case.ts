import {Company} from '../../../domain/companies/entities/company.entity';
import {ICompanyRepository} from '../../../domain/companies/repositories/company.repository.interface';

export interface UpdateCompanyInfoDTO {
  companyId: string;
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
}

export class UpdateCompanyInfoUseCase {
  constructor(private readonly companyRepository: ICompanyRepository)  { /* Inyectado por constructor */ }

  async execute(dto: UpdateCompanyInfoDTO): Promise<Company>  {
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

    company.updateInfo({
      name: dto.name,
      imageUrl: dto.imageUrl,
      phoneNumber: dto.phoneNumber,
      address: dto.address,
      city: dto.city,
      department: dto.department,
      country: dto.country,
      contactEmail: dto.contactEmail,
      website: dto.website,
      postalCode: dto.postalCode,
    });

    return this.companyRepository.update(company);
  }
}
