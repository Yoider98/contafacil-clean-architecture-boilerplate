import {IReceivableRepository} from '../../../domain/receivables/repositories/receivable.repository.interface';
import {Receivable} from '../../../domain/receivables/entities/receivable.entity';

export interface CreateReceivableDTO {
  companyId: string;
  thirdPartyId: string;
  documentRef?: string;
  amount: number;
  dueDate?: Date;
}

export class CreateReceivableUseCase {
  constructor(private receivableRepository: IReceivableRepository)  { /* Inyectado por constructor */ }

  async execute(dto: CreateReceivableDTO): Promise<Receivable>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });

    return this.receivableRepository.create(receivable);
  }
}
