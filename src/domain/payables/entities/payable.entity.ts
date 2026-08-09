import {DomainEntity} from '../../shared/domain.entity';

export enum PayableStatus {
  OPEN = 'OPEN',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export class Payable extends DomainEntity {
  companyId: string;
  thirdPartyId: string; // supplier id
  documentRef?: string; // purchase id or external reference
  amount: number;
  balance: number;
  dueDate?: Date;
  status: PayableStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<Payable>) {
    super(data);
    this.amount = data?.amount ?? 0;
    this.balance = data?.balance ?? this.amount;
    this.status = data?.status ?? PayableStatus.OPEN;
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }

  applyPayment(amount: number): void {
    if (this.status === PayableStatus.CANCELLED) {
      throw new Error('No se puede aplicar pago a una cuenta anulada');
    }
    if (amount <= 0) throw new Error('El valor del pago debe ser mayor que 0');

    this.balance = Math.max(0, Number((this.balance - amount).toFixed(2)));
    if (this.balance === 0) this.status = PayableStatus.PAID;
    else if (this.balance < this.amount)
      this.status = PayableStatus.PARTIALLY_PAID;
    this.updatedAt = new Date();
  }

  cancel(): void {
    if (this.status === PayableStatus.PAID) {
      throw new Error('No se puede anular una cuenta ya pagada');
    }
    this.status = PayableStatus.CANCELLED;
    this.updatedAt = new Date();
  }
}
