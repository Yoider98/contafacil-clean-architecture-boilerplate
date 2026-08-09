import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'inventory_movements'},
    strict: true,
  },
})
export class InventoryMovementModel extends Entity {
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
    postgresql: {columnName: 'warehouse_id'},
  })
  warehouseId: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'product_id'},
  })
  productId: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'string',
    required: false,
    postgresql: {columnName: 'reference_type'},
  })
  referenceType?: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {columnName: 'reference_id'},
  })
  referenceId?: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {columnName: 'user_id'},
  })
  userId?: string;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt?: Date;

  constructor(data?: Partial<InventoryMovementModel>)  { super(); /* Inyectado por constructor */ }
}
