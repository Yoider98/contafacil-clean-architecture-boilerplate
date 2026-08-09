import {IReceivableRepository} from '../../../domain/receivables/repositories/receivable.repository.interface';
import {Receivable} from '../../../domain/receivables/entities/receivable.entity';

export interface ReceivableStatement {
  companyId: string;
  thirdPartyId: string;
  totalAmount: number;
  totalBalance: number;
  receivables: Receivable[];
}

export class GetReceivableStatementUseCase {
  constructor(private receivableRepository: IReceivableRepository)  { /* Inyectado por constructor */ }

  async execute(
    companyId: string,
    thirdPartyId: string,
  ): Promise<ReceivableStatement>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
      order: ['createdAt DESC'],
    });

    const totalAmount = receivables.reduce((sum, r) => sum + r.amount, 0);
    const totalBalance = receivables.reduce((sum, r) => sum + r.balance, 0);

    return {
      companyId,
      thirdPartyId,
      totalAmount,
      totalBalance,
      receivables,
    };
  }
}
