import {SalesItem} from '../entities/sales-item.entity';
import {Sales} from '../entities/sales.entity';

export interface ISalesRepository {
  create(sales: Sales, options?: any): Promise<Sales>;
  findById(id: string): Promise<Sales>;
  findAll(): Promise<Sales[]>;
  findAllByCompany(companyId: string): Promise<Sales[]>;
}

export interface ISalesItemRepository {
  create(salesItem: SalesItem, options?: any): Promise<SalesItem>;
  findById(id: string): Promise<SalesItem>;
  findAll(): Promise<SalesItem[]>;
  findBySalesId(salesId: string): Promise<SalesItem[]>;
}
