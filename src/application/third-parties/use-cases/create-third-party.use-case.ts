import {
  ThirdParty,
  DocumentType,
  ThirdPartyRole,
} from '../../../domain/third-parties/entities/third-party.entity';
import {IThirdPartyRepository} from '../../../domain/third-parties/repositories/third-party.repository';
import {
  PersonType,
  TaxRegime,
} from '../../../domain/companies/enums/company-fiscal.enum';

export interface CreateThirdPartyDTO {
  companyId: string;
  personType: PersonType;
  documentType: DocumentType;
  identificationNumber: string;
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
  isSelfRetainer?: boolean;
}

export class CreateThirdPartyUseCase {
  constructor(private thirdPartyRepository: IThirdPartyRepository)  { /* Inyectado por constructor */ }

  async execute(dto: CreateThirdPartyDTO): Promise<ThirdParty>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    if (!dto.identificationNumber || !dto.name)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    const existing = await this.thirdPartyRepository.findByIdentification(
      dto.companyId,
      dto.documentType,
      dto.identificationNumber,
    );

    if (existing)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } ${dto.identificationNumber}`,
      );
    }

    const thirdParty = new ThirdParty({
      companyId: dto.companyId,
      personType: dto.personType,
      documentType: dto.documentType,
      identificationNumber: dto.identificationNumber,
      name: dto.name,
      tradeName: dto.tradeName,
      roles: dto.roles,
      taxRegime: dto.taxRegime,
      economicActivityCode: dto.economicActivityCode,
      address: dto.address,
      cityCode: dto.cityCode,
      departmentCode: dto.departmentCode,
      email: dto.email,
      phone: dto.phone,
      isSelfRetainer: dto.isSelfRetainer,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.thirdPartyRepository.create(thirdParty);
  }
}
