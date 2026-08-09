import {CashRegister} from '../entities/cash-register.entity';

export interface ICashRegisterRepository {
  create(register: CashRegister): Promise<CashRegister>;
  findById(id: string): Promise<CashRegister | null>;
  findByCompanyId(companyId: string, status?: string): Promise<CashRegister[]>;
  findOpenByCompanyAndDate(
    companyId: string,
    date: string,
  ): Promise<CashRegister | null>;
  update(id: string, data: Partial<CashRegister>): Promise<CashRegister>;
}
