import {Product} from '../entities/product.entity';
import {AnyObject} from '@loopback/repository';

export interface IProductRepository {
  save(product: Product, options?: AnyObject): Promise<Product>;
  findById(id: string, options?: AnyObject): Promise<Product | null>;
  findBySku(
    tenantId: string,
    sku: string,
    options?: AnyObject,
  ): Promise<Product | null>;
  findByCompanyId(companyId: string, options?: AnyObject): Promise<Product[]>;
}
