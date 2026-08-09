import {v4 as uuidv4} from 'uuid';
import DocumentStatus from '../../shared/enums/document-status.enum';
import DianStatus from '../enums/dian-status.enum';
import {
  calculateTaxes,
  TaxCalculationInput,
  TaxCalculationResult,
} from '../../../shared/utils/tax-engine';

export type InvoiceItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export class Invoice {
  id: string;
  companyId: string;
  resolutionId?: string;
  number?: string;
  items: InvoiceItem[];
  subtotal: number;
  iva: number;
  reteFuente: number;
  reteIVA: number;
  reteICA: number;
  total: number;
  status: DocumentStatus;

  // DIAN fields
  cufe?: string;
  qr?: string;
  dianStatus: DianStatus;
  dianMessage?: string;
  xmlPayload?: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<Invoice>) {
    this.id = data?.id ?? uuidv4();
    this.companyId = data?.companyId ?? '';
    this.resolutionId = data?.resolutionId;
    this.number = data?.number;
    this.items = data?.items ?? [];
    this.subtotal = data?.subtotal ?? 0;
    this.iva = data?.iva ?? 0;
    this.reteFuente = data?.reteFuente ?? 0;
    this.reteIVA = data?.reteIVA ?? 0;
    this.reteICA = data?.reteICA ?? 0;
    this.total = data?.total ?? 0;
    this.status = data?.status ?? DocumentStatus.DRAFT;

    this.cufe = data?.cufe;
    this.qr = data?.qr;
    this.dianStatus = data?.dianStatus ?? DianStatus.NOT_SENT;
    this.dianMessage = data?.dianMessage;
    this.xmlPayload = data?.xmlPayload;

    this.createdAt = data?.createdAt ?? new Date();
    this.updatedAt = data?.updatedAt ?? new Date();
  }

  calculateTaxes(input: TaxCalculationInput): TaxCalculationResult {
    const result = calculateTaxes(input);
    this.subtotal = result.subtotal;
    this.iva = result.iva;
    this.reteFuente = result.reteFuente;
    this.reteIVA = result.reteIVA;
    this.reteICA = result.reteICA;
    this.total = result.total;
    this.updatedAt = new Date();
    return result;
  }

  ensureModifiable(): void {
    if (
      this.status === DocumentStatus.APPROVED ||
      this.status === DocumentStatus.ANNULLED
    ) {
      throw new Error(`Documento no modificable en estado ${this.status}`);
    }
  }
}

export default Invoice;
