import {IAccountingPeriodRepository} from '../../../domain/accounting/repositories/accounting-period.repository.interface';
import {
  AccountingPeriod,
  AccountingPeriodStatus,
} from '../../../domain/accounting/entities/accounting-period.entity';

export interface OpenAccountingPeriodDTO {
  companyId: string;
  fromDate: Date;
  toDate: Date;
}

export class OpenAccountingPeriodUseCase {
  constructor(private accountingRepository: IAccountingPeriodRepository)  { /* Inyectado por constructor */ }

  async execute(dto: OpenAccountingPeriodDTO): Promise<AccountingPeriod>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });

    return this.accountingRepository.create(period);
  }
}
