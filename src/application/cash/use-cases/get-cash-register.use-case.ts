import {CashRegister} from '../../../domain/cash/entities/cash-register.entity';
import {ICashRegisterRepository} from '../../../domain/cash/repositories/cash-register.repository.interface';
import {ICashMovementRepository} from '../../../domain/cash/repositories/cash-movement.repository.interface';

export class GetCashRegisterUseCase {
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

    const {totalIn, totalOut} =
      await this.cashMovementRepository.sumByCashRegisterId(id);
    const balance = register.openingBalance + totalIn - totalOut;

    return Object.assign(register, {summary: {totalIn, totalOut, balance}});
  }

  async findByCompany(
    companyId: string,
    status?: string,
  ): Promise<CashRegister[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
