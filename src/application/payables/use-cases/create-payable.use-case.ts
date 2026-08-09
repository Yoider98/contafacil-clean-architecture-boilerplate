import {IPayableRepository} from '../../../domain/payables/repositories/payable.repository.interface';
import {Payable} from '../../../domain/payables/entities/payable.entity';

export interface CreatePayableDTO {
  companyId: string;
  thirdPartyId: string;
  documentRef?: string;
  amount: number;
  dueDate?: Date;
}

export class CreatePayableUseCase {
  constructor(private payableRepository: IPayableRepository)  { /* Inyectado por constructor */ }

  async execute(dto: CreatePayableDTO): Promise<Payable>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });

    return this.payableRepository.create(payable);
  }
}
