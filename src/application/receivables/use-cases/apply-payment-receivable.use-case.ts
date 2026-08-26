import {IReceivableRepository} from '../../../domain/receivables/repositories/receivable.repository.interface';
import {IQuotationRepository} from '../../../domain/sales/repositories/quotation.repository.interface';
import {Receivable} from '../../../domain/receivables/entities/receivable.entity';
import {v4 as uuidv4} from 'uuid';

export class ApplyPaymentToReceivableUseCase {
  constructor(
    private receivableRepo: IReceivableRepository,
    private quotationRepo?: IQuotationRepository,
  )  { /* Inyectado por constructor */ }

  async execute(
    receivableId: string,
    amount: number,
    reference?: string,
  ): Promise<Receivable>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }`;
          if (receivable.balance === 0)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
          quotation.updatedAt = new Date();
          await this.quotationRepo.update(quotation);
        }
      } catch (err)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    }

    return receivable;
  }
}

export default ApplyPaymentToReceivableUseCase;
