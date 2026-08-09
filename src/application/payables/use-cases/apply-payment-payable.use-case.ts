import {IPayableRepository} from '../../../domain/payables/repositories/payable.repository.interface';
import {Payable} from '../../../domain/payables/entities/payable.entity';

export class ApplyPaymentToPayableUseCase {
  constructor(private payableRepo: IPayableRepository)  { /* Inyectado por constructor */ }

  async execute(payableId: string, amount: number): Promise<Payable>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}

export default ApplyPaymentToPayableUseCase;
