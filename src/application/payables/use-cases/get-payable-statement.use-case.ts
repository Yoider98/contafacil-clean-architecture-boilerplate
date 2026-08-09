import {IPayableRepository} from '../../../domain/payables/repositories/payable.repository.interface';
import {Payable} from '../../../domain/payables/entities/payable.entity';

export interface PayableStatement {
  companyId: string;
  thirdPartyId: string;
  totalAmount: number;
  totalBalance: number;
  payables: Payable[];
}

export class GetPayableStatementUseCase {
  constructor(private payableRepository: IPayableRepository)  { /* Inyectado por constructor */ }

  async execute(
    companyId: string,
    thirdPartyId: string,
  ): Promise<PayableStatement>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
      order: ['createdAt DESC'],
    });

    const totalAmount = payables.reduce((sum, p) => sum + p.amount, 0);
    const totalBalance = payables.reduce((sum, p) => sum + p.balance, 0);

    return {
      companyId,
      thirdPartyId,
      totalAmount,
      totalBalance,
      payables,
    };
  }
}
