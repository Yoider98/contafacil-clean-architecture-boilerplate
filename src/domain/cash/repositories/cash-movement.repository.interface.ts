import {CashMovement} from '../entities/cash-movement.entity';

export interface ICashMovementRepository {
  create(movement: CashMovement): Promise<CashMovement>;
  findByCashRegisterId(cashRegisterId: string): Promise<CashMovement[]>;
  sumByCashRegisterId(
    cashRegisterId: string,
  ): Promise<{totalIn: number; totalOut: number}>;
}
