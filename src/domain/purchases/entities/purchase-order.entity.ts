import {DomainEntity} from '../../shared/domain.entity';

export class PurchaseOrder extends DomainEntity {
  companyId: string;
  supplier: string;
  subtotal: number;
  taxTotal: number;
  retentionTotal: number;
  total: number;
  notes?: string;
  expectedDeliveryDate?: Date;
  status: string; // DRAFT | APPROVED | RECEIVED | CANCELLED
  createdAt: Date;

  constructor(data?: Partial<PurchaseOrder>) {
    super(data);
    this.subtotal = data?.subtotal ?? 0;
    this.taxTotal = data?.taxTotal ?? 0;
    this.retentionTotal = data?.retentionTotal ?? 0;
    this.total = data?.total ?? 0;
    this.status = data?.status ?? 'DRAFT';
    if (!this.createdAt) this.createdAt = new Date();
  }
}
