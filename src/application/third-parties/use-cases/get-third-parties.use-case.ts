import {ThirdParty} from '../../../domain/third-parties/entities/third-party.entity';
import {IThirdPartyRepository} from '../../../domain/third-parties/repositories/third-party.repository';

export interface GetThirdPartiesFilter {
  role?: string;
  search?: string;
  isActive?: boolean;
  includeInactive?: boolean;
}

export class GetThirdPartiesUseCase {
  constructor(private thirdPartyRepository: IThirdPartyRepository)  { /* Inyectado por constructor */ }

  async execute(
    companyId: string,
    filter?: GetThirdPartiesFilter,
  ): Promise<ThirdParty[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    return this.thirdPartyRepository.find(companyId, filter);
  }
}
