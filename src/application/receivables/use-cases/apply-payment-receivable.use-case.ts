import {IReceivableRepository} from '../../../domain/receivables/repositories/receivable.repository.interface';
import {Receivable} from '../../../domain/receivables/entities/receivable.entity';

export class ApplyPaymentToReceivableUseCase {
  constructor(private receivableRepo: IReceivableRepository)  { /* Inyectado por constructor */ }

  async execute(receivableId: string, amount: number): Promise<Receivable>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}

export default ApplyPaymentToReceivableUseCase;
