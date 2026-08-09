import {IFiscalRegimeRepository} from '../../../domain/accounting/repositories/accounting.repository.interface';
import {FiscalRegime} from '../../../domain/accounting/entities/fiscal-regime.entity';

export interface CreateFiscalRegimeDto {
  companyId: string;
  code: string;
  name: string;
  description?: string;
  active?: boolean;
}

export class CreateFiscalRegimeUseCase {
  constructor(
    private readonly fiscalRegimeRepository: IFiscalRegimeRepository,
  )  { /* Inyectado por constructor */ }

  async execute(dto: CreateFiscalRegimeDto): Promise<FiscalRegime>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }' already exists for this company`,
      );
    }

    return this.fiscalRegimeRepository.create(
      new FiscalRegime({
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        active: dto.active,
      }),
    );
  }
}
