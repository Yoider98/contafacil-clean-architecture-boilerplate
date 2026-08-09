import {v4 as uuidv4} from 'uuid';
import {Company} from '../../../domain/companies/entities/company.entity';
import {CompanyModel} from '../models/company.model';
import {
  PersonType,
  TaxRegime,
  CompanyType,
} from '../../../domain/companies/enums/company-fiscal.enum';

export class CompanyMapper {
  static toDomain(model: CompanyModel): Company  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toPersistence(entity: Company): CompanyModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
