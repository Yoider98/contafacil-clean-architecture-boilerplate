import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'purchase_items'},
    strict: true,
  },
})
export class PurchaseItemModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'purchase_id'},
  })
  purchaseId: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'product_id'},
  })
  productId: string;

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

  constructor(data?: Partial<PurchaseItemModel>)  { super(); /* Inyectado por constructor */ }
}
