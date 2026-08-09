import {CashRegister} from '../../../domain/cash/entities/cash-register.entity';
import {CashRegisterStatus} from '../../../domain/cash/enums/cash-register-status.enum';
import {ICashRegisterRepository} from '../../../domain/cash/repositories/cash-register.repository.interface';
import {ICashMovementRepository} from '../../../domain/cash/repositories/cash-movement.repository.interface';

export class CloseCashRegisterUseCase {
  constructor(
    private cashRegisterRepository: ICashRegisterRepository,
    private cashMovementRepository: ICashMovementRepository,
  )  { /* Inyectado por constructor */ }

  async execute(id: string): Promise<
    CashRegister &  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  };
    }
  > {
    const register = await this.cashRegisterRepository.findById(id);
    if (!register) throw new Error('Caja no encontrada');
    if (register.status === CashRegisterStatus.CLOSED)
      throw new Error('La caja ya está cerrada');

    // Calculate totals from movements
    const {totalIn, totalOut} =
      await this.cashMovementRepository.sumByCashRegisterId(id);
    const closingBalance = register.openingBalance + totalIn - totalOut;

    const updated = await this.cashRegisterRepository.update(id, {
      status: CashRegisterStatus.CLOSED,
      closingBalance,
    });

    return Object.assign(updated, {
      summary: {totalIn, totalOut, balance: closingBalance},
    });
  }
}
