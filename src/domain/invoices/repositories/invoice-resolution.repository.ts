import {
  InvoiceResolution,
  InvoiceDocumentType,
} from '../entities/invoice-resolution.entity';

export interface IInvoiceResolutionRepository {
  create(resolution: InvoiceResolution): Promise<InvoiceResolution>;
  findById(id: string, companyId: string): Promise<InvoiceResolution | null>;
  findByPrefix(
    companyId: string,
    prefix: string,
  ): Promise<InvoiceResolution | null>;
  findActiveByDocumentType(
    companyId: string,
    documentType: InvoiceDocumentType,
  ): Promise<InvoiceResolution | null>;
  findAll(companyId: string): Promise<InvoiceResolution[]>;
  update(resolution: InvoiceResolution): Promise<InvoiceResolution>;
  incrementAndGetNextNumber(id: string, companyId: string): Promise<string>;
}
