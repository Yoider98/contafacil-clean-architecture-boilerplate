import {Warehouse} from '../entities/warehouse.entity';
import {AnyObject} from '@loopback/repository';

export interface IWarehouseRepository {
  save(warehouse: Warehouse, options?: AnyObject): Promise<Warehouse>;
  findById(id: string, options?: AnyObject): Promise<Warehouse | null>;
  findByCompanyId(companyId: string, options?: AnyObject): Promise<Warehouse[]>;
}
