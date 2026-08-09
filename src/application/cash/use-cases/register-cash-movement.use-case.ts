import {CashMovement} from '../../../domain/cash/entities/cash-movement.entity';
import {CashMovementType} from '../../../domain/cash/enums/cash-movement-type.enum';
import {CashRegisterStatus} from '../../../domain/cash/enums/cash-register-status.enum';
import {ICashRegisterRepository} from '../../../domain/cash/repositories/cash-register.repository.interface';
import {ICashMovementRepository} from '../../../domain/cash/repositories/cash-movement.repository.interface';

export interface RegisterCashMovementDto {
  cashRegisterId: string;
  type: CashMovementType;
  amount: number;
  category?: string;
  referenceType?: string;
  referenceId?: string;
}

export class RegisterCashMovementUseCase {
  constructor(
    private cashRegisterRepository: ICashRegisterRepository,
    private cashMovementRepository: ICashMovementRepository,
  )  { /* Inyectado por constructor */ }

  async execute(dto: RegisterCashMovementDto): Promise<CashMovement>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (!dto.amount || dto.amount <= 0) throw new Error('amount must be > 0');

    // Validate the cash register exists and is OPEN
    const register = await this.cashRegisterRepository.findById(
      dto.cashRegisterId,
    );
    if (!register) throw new Error('Caja no encontrada');
    if (register.status !== CashRegisterStatus.OPEN)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    const movement = new CashMovement({
      cashRegisterId: dto.cashRegisterId,
      type: dto.type,
      amount: dto.amount,
      category: dto.category,
      referenceType: dto.referenceType,
      referenceId: dto.referenceId,
    });

    return this.cashMovementRepository.create(movement);
  }
}
