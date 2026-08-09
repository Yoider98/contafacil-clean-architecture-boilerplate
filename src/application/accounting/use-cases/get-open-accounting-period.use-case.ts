import {IAccountingPeriodRepository} from '../../../domain/accounting/repositories/accounting-period.repository.interface';
import {AccountingPeriod} from '../../../domain/accounting/entities/accounting-period.entity';

export class GetOpenAccountingPeriodUseCase {
  constructor(private accountingRepository: IAccountingPeriodRepository)  { /* Inyectado por constructor */ }

  async execute(companyId: string): Promise<AccountingPeriod | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
