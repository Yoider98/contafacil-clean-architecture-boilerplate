import {Invoice} from '../entities/invoice.entity';

export interface IInvoiceRepository {
  create(invoice: Invoice): Promise<Invoice>;
  findById(id: string): Promise<Invoice | null>;
  update(invoice: Invoice): Promise<Invoice>;
  findByCompany(companyId: string): Promise<Invoice[]>;
}

export default IInvoiceRepository;
