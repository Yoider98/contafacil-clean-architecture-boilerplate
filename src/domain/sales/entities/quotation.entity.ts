import { DomainEntity } from '../../shared/domain.entity';

export class Quotation extends DomainEntity {
  companyId: string;
  thirdPartyId: string;
  issueDate: Date;
  validityDays: number;
  currency: string;
  notes?: string;
  subtotal: number;
  taxTotal: number;
  retentionTotal: number;
  total: number;
  status: string; // DRAFT | APPROVED | EXPIRED
  invoiceId?: string;
  invoiceNumber?: string;
  receiptId?: string;
  receiptNumber?: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(data?: Partial<Quotation>) {
    super(data);
    this.validityDays = data?.validityDays ?? 15;
    this.currency = data?.currency ?? 'COP';
    this.subtotal = data?.subtotal ?? 0;
    this.taxTotal = data?.taxTotal ?? 0;
    this.retentionTotal = data?.retentionTotal ?? 0;
    this.total = data?.total ?? 0;
    this.status = data?.status ?? 'DRAFT';
    this.invoiceId = data?.invoiceId;
    this.invoiceNumber = data?.invoiceNumber;
    this.receiptId = data?.receiptId;
    this.receiptNumber = data?.receiptNumber;
    if (!this.createdAt) this.createdAt = new Date();
  }
}
