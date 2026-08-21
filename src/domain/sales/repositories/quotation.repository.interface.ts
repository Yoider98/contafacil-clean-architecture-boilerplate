import {QuotationItem} from '../entities/quotation-item.entity';
import {Quotation} from '../entities/quotation.entity';

export interface IQuotationRepository {
  create(quotation: Quotation, options?: any): Promise<Quotation>;
  findById(id: string): Promise<Quotation>;
  findAll(): Promise<Quotation[]>;
  findAllByCompany(companyId: string): Promise<Quotation[]>;
  update(quotation: Quotation, options?: any): Promise<Quotation>;
}

export interface IQuotationItemRepository {
  create(quotationItem: QuotationItem, options?: any): Promise<QuotationItem>;
  findById(id: string): Promise<QuotationItem>;
  findAll(): Promise<QuotationItem[]>;
  findByQuotationId(quotationId: string): Promise<QuotationItem[]>;
  deleteByQuotationId(quotationId: string, options?: any): Promise<void>;
}
