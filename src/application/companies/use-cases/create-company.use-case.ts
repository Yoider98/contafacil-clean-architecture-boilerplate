import {Company} from '../../../domain/companies/entities/company.entity';
import {ICompanyRepository} from '../../../domain/companies/repositories/company.repository.interface';

export interface CreateCompanyDto {
  name: string;
  plan: string;
  companyType?: string;
  imageUrl?: string;
  phoneNumber: string;
  address: string;
  city: string;
  department: string;
  country: string;
  contactEmail: string;
  website?: string;
  postalCode?: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository)  { /* Inyectado por constructor */ }

  async execute(dto: CreateCompanyDto): Promise<Company>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }),
    );
  }
}
