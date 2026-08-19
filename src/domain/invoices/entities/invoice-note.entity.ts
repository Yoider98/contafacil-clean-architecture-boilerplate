import {v4 as uuidv4} from 'uuid';
import {DomainEntity} from '../../shared/domain.entity';
import {InvoiceItem} from './invoice.entity';
import DianStatus from '../enums/dian-status.enum';

export type InvoiceNoteType = 'CREDIT' | 'DEBIT';

export class InvoiceNote extends DomainEntity {
  invoiceId: string;
  noteType: InvoiceNoteType;
  consecutive: string;
  concept: string; // Código de Concepto DIAN (ej. 1 = Devolución, 2 = Descuento)
  items: InvoiceItem[];
  subtotal: number;
  iva: number;
  total: number;
  cude?: string;
  xmlPayload?: string;
  dianStatus: DianStatus;
  dianMessage?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<InvoiceNote>) {
    super(data);
    this.id = data?.id ?? uuidv4();
    this.companyId = data?.companyId ?? '';
    this.invoiceId = data?.invoiceId ?? '';
    this.noteType = data?.noteType ?? 'CREDIT';
    this.consecutive = data?.consecutive ?? '';
    this.concept = data?.concept ?? '1';
    this.items = data?.items ?? [];
    this.subtotal = data?.subtotal ?? 0;
    this.iva = data?.iva ?? 0;
    this.total = data?.total ?? 0;
    this.cude = data?.cude;
    this.xmlPayload = data?.xmlPayload;
    this.dianStatus = data?.dianStatus ?? DianStatus.NOT_SENT;
    this.dianMessage = data?.dianMessage;
    this.createdAt = data?.createdAt ?? new Date();
    this.updatedAt = data?.updatedAt ?? new Date();
  }
}
