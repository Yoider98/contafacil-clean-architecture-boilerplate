import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'purchase_order_items'},
    strict: true,
  },
})
export class PurchaseOrderItemModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'purchase_order_id'},
  })
  purchaseOrderId: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'product_id'},
  })
  productId: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'company_id'},
  })
  companyId: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  cost: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'warehouse_id'},
  })
  warehouseId?: string;

  @property({
    type: 'number',
    default: 0,
    postgresql: {columnName: 'tax_rate'},
  })
  taxRate?: number;

  @property({
    type: 'number',
    default: 0,
    postgresql: {columnName: 'tax_amount'},
  })
  taxAmount?: number;

  @property({
    type: 'number',
    default: 0,
    postgresql: {columnName: 'retention_rate'},
  })
  retentionRate?: number;

  @property({
    type: 'number',
    default: 0,
    postgresql: {columnName: 'retention_amount'},
  })
  retentionAmount?: number;

  constructor(data?: Partial<PurchaseOrderItemModel>)  { super(); /* Inyectado por constructor */ }
}
