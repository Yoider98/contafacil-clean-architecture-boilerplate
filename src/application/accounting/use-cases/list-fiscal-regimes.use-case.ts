import {IFiscalRegimeRepository} from '../../../domain/accounting/repositories/accounting.repository.interface';
import {FiscalRegime} from '../../../domain/accounting/entities/fiscal-regime.entity';

export class ListFiscalRegimesUseCase {
  constructor(
    private readonly fiscalRegimeRepository: IFiscalRegimeRepository,
  )  { /* Inyectado por constructor */ }

  async execute(companyId: string): Promise<FiscalRegime[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
