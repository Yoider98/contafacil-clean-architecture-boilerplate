import {v4 as uuidv4} from 'uuid';
import {
  ThirdParty,
  DocumentType,
  ThirdPartyRole,
} from '../../../domain/third-parties/entities/third-party.entity';
import {
  PersonType,
  TaxRegime,
} from '../../../domain/companies/enums/company-fiscal.enum';
import {ThirdPartyModel} from '../models/third-party.model';

export class ThirdPartyMapper {
  static toDomain(model: ThirdPartyModel): ThirdParty  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toPersistence(entity: ThirdParty): ThirdPartyModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
