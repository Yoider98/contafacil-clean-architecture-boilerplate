import {Account} from '../../../domain/accounting/entities/account.entity';
import {IAccountRepository} from '../../../domain/accounting/repositories/accounting.repository.interface';

export interface CreateAccountDto {
  companyId: string;
  /** Número de cuenta PUC (ej: "1435", "4135"). Requerido. */
  code: string;
  name: string;
  /** Tipo de cuenta (texto libre: Activo, Pasivo, Ingreso, Gasto, Costo...) */
  type?: string;
  /** Descripción opcional de la cuenta */
  description?: string;
}

export class CreateAccountUseCase {
  constructor(private readonly accountRepository: IAccountRepository)  { /* Inyectado por constructor */ }

  async execute(dto: CreateAccountDto): Promise<Account>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }),
    );
  }
}
