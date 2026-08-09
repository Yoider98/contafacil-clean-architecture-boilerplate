import {Entity, model, property} from '@loopback/repository';
import ProductType from '../../../domain/inventory/enums/product-type.enum';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'products'},
    strict: true,
  },
})
export class ProductModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'company_id'},
  })
  companyId: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  sku: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {columnName: 'purchase_price'},
  })
  purchasePrice: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {columnName: 'sale_price'},
  })
  salePrice: number;

  @property({
    type: 'number',
    default: 0,
    postgresql: {columnName: 'stock_min'},
  })
  stockMin: number;

  @property({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @property({
    type: 'string',
    postgresql: {columnName: 'warehouse_id'},
    required: false,
  })
  warehouseId?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'product_type'},
    jsonSchema: {enum: Object.values(ProductType)},
  })
  productType?: string;

  @property({
    type: 'string',
    default: '1435',
    postgresql: {columnName: 'inventory_account_code'},
  })
  inventoryAccountCode: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'cost_account_code'},
  })
  costAccountCode: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'tax_percentage'},
  })
  taxPercentage: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'unit_of_measure'},
  })
  unitOfMeasure: string;

  @property({
    type: 'number',
    postgresql: {columnName: 'quantity'},
    default: 0,
  })
  quantity?: number;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt: Date;

  constructor(data?: Partial<ProductModel>)  { super(); /* Inyectado por constructor */ }
}
