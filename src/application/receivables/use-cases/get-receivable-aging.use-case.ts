import {IReceivableRepository} from '../../../domain/receivables/repositories/receivable.repository.interface';

export interface AgingReport {
  companyId: string;
  current: number;
  days30: number;
  days60: number;
  days90Plus: number;
  total: number;
}

export class GetReceivableAgingUseCase {
  constructor(private receivableRepository: IReceivableRepository)  { /* Inyectado por constructor */ }

  async execute(companyId: string): Promise<AgingReport>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });

    const now = new Date();
    const report: AgingReport = {
      companyId,
      current: 0,
      days30: 0,
      days60: 0,
      days90Plus: 0,
      total: 0,
    };

    for (const r of receivables)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

      const diffTime = Math.abs(now.getTime() - new Date(r.dueDate).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 30)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else if (diffDays <= 60)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else {
        report.days90Plus += r.balance;
      }
    }

    return report;
  }
}
