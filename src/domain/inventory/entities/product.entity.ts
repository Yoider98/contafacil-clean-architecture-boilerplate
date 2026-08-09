import {DomainEntity} from '../../shared/domain.entity';
import ProductType from '../enums/product-type.enum';

export class Product extends DomainEntity {
  sku: string;
  name: string;
  purchasePrice: number;
  salePrice: number;
  stockMin: number;
  active: boolean;
  warehouseId?: string;
  companyId: string;
  productType: ProductType;
  inventoryAccountCode: string;
  costAccountCode: string;
  taxPercentage: string;
  unitOfMeasure: string;
  quantity?: number;
  createdAt: Date;

  constructor(data?: Partial<Product>) {
    super(data);
    if (!this.productType) {
      this.productType = ProductType.FINISHED;
    }
    if (!this.inventoryAccountCode) {
      this.inventoryAccountCode = '1435';
    }
    if (!this.costAccountCode) {
      this.costAccountCode = '6105';
    }
    if (!this.taxPercentage) {
      this.taxPercentage = '';
    }
    if (!this.unitOfMeasure) {
      this.unitOfMeasure = 'unidad';
    }
    if (this.stockMin === undefined || this.stockMin === null) {
      this.stockMin = 0;
    }
    if (this.quantity === undefined || this.quantity === null) {
      this.quantity = 0;
    }
  }
}
