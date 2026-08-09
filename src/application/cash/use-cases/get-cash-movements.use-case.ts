import {CashMovement} from '../../../domain/cash/entities/cash-movement.entity';
import {ICashMovementRepository} from '../../../domain/cash/repositories/cash-movement.repository.interface';

export class GetCashMovementsUseCase {
  constructor(private cashMovementRepository: ICashMovementRepository)  { /* Inyectado por constructor */ }

  async execute(cashRegisterId: string): Promise<CashMovement[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
