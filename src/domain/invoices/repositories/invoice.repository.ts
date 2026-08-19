import {Invoice} from '../entities/invoice.entity';

export interface IInvoiceRepository {
  create(invoice: Invoice, options?: Record<string, any>): Promise<Invoice>;
  findById(id: string, options?: Record<string, any>): Promise<Invoice | null>;
  update(invoice: Invoice, options?: Record<string, any>): Promise<Invoice>;
  findByCompany(companyId: string): Promise<Invoice[]>;
}

export default IInvoiceRepository;
