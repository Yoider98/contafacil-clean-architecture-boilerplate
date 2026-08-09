import {DomainEntity} from '../../shared/domain.entity';
import {CashRegisterStatus} from '../enums/cash-register-status.enum';

export class CashRegister extends DomainEntity {
  companyId: string;
  date: string; // 'YYYY-MM-DD'
  openingBalance: number;
  closingBalance?: number;
  status: CashRegisterStatus;
  createdAt?: Date;

  constructor(data?: Partial<CashRegister>) {
    super(data);
  }
}
