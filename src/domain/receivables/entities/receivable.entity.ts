import {DomainEntity} from '../../shared/domain.entity';

export enum ReceivableStatus {
  OPEN = 'OPEN',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export class Receivable extends DomainEntity {
  companyId: string;
  thirdPartyId: string; // customer id
  documentRef?: string; // invoice id or external reference
  amount: number;
  balance: number;
  dueDate?: Date;
  status: ReceivableStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<Receivable>) {
    super(data);
    this.amount = data?.amount ?? 0;
    this.balance = data?.balance ?? this.amount;
    this.status = data?.status ?? ReceivableStatus.OPEN;
    if (!this.createdAt) this.createdAt = new Date();
    if (!this.updatedAt) this.updatedAt = new Date();
  }

  applyPayment(amount: number): void {
    if (this.status === ReceivableStatus.CANCELLED) {
      throw new Error('No se puede aplicar pago a una cuenta anulada');
    }
    if (amount <= 0) throw new Error('El valor del pago debe ser mayor que 0');

    this.balance = Math.max(0, Number((this.balance - amount).toFixed(2)));
    if (this.balance === 0) this.status = ReceivableStatus.PAID;
    else if (this.balance < this.amount)
      this.status = ReceivableStatus.PARTIALLY_PAID;
    this.updatedAt = new Date();
  }

  cancel(): void {
    if (this.status === ReceivableStatus.PAID) {
      throw new Error('No se puede anular una cuenta ya pagada');
    }
    this.status = ReceivableStatus.CANCELLED;
    this.updatedAt = new Date();
  }
}
