import {CashRegister} from '../../../domain/cash/entities/cash-register.entity';
import {CashRegisterStatus} from '../../../domain/cash/enums/cash-register-status.enum';
import {ICashRegisterRepository} from '../../../domain/cash/repositories/cash-register.repository.interface';

export interface OpenCashRegisterDto {
  companyId: string;
  date?: string; // defaults to today
  openingBalance: number;
}

export class OpenCashRegisterUseCase {
  constructor(private cashRegisterRepository: ICashRegisterRepository)  { /* Inyectado por constructor */ }

  async execute(dto: OpenCashRegisterDto): Promise<CashRegister>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    // Use today's date if not provided
    const date = dto.date ?? new Date().toISOString().split('T')[0];

    // Check no open register exists for this company on this date (unique constraint)
    const existing = await this.cashRegisterRepository.findOpenByCompanyAndDate(
      dto.companyId,
      date,
    );
    if (existing)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }. Ciérrala antes de abrir otra.`,
      );
    }

    const register = new CashRegister({
      companyId: dto.companyId,
      date,
      openingBalance: dto.openingBalance,
      status: CashRegisterStatus.OPEN,
    });

    return this.cashRegisterRepository.create(register);
  }
}
