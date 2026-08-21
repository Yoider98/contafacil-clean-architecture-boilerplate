import {DomainEntity} from '../../shared/domain.entity';

export class Sales extends DomainEntity {
  companyId: string;
  paymentMethod: string;
  thirdPartyId: string;
  status: string;
  invoiceId?: string;
  invoiceNumber?: string;
  subtotal: number;
  taxTotal: number;
  retentionTotal: number;
  total: number;
  createdAt: Date;

  constructor(data?: Partial<Sales>) {
    super(data);
    this.thirdPartyId = data?.thirdPartyId ?? '';
    this.status = data?.status ?? 'PENDING_INVOICE';
    this.invoiceId = data?.invoiceId;
    this.invoiceNumber = data?.invoiceNumber;
    this.subtotal = data?.subtotal ?? 0;
    this.taxTotal = data?.taxTotal ?? 0;
    this.retentionTotal = data?.retentionTotal ?? 0;
    this.total = data?.total ?? 0;
    if (!this.createdAt) this.createdAt = new Date();
  }
}
