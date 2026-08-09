import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'sale_items'},
    strict: true,
  },
})
export class SalesItemModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'sale_id'},
  })
  salesId: string;

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
  price: number;

  constructor(data?: Partial<SalesItemModel>)  { super(); /* Inyectado por constructor */ }
}
