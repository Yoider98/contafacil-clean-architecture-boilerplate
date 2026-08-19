import {InvoiceNote} from '../entities/invoice-note.entity';

export interface IInvoiceNoteRepository {
  create(note: InvoiceNote, options?: Record<string, any>): Promise<InvoiceNote>;
  findById(id: string, companyId: string): Promise<InvoiceNote | null>;
  findByInvoice(invoiceId: string, companyId: string): Promise<InvoiceNote[]>;
  countByCompany(companyId: string, noteType: string): Promise<number>;
}
