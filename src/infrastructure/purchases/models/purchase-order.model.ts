import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'purchase_orders'},
    strict: true,
  },
})
export class PurchaseOrderModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'company_id'},
  })
  companyId: string;

  @property({
    type: 'string',
  })
  supplier?: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'number',
    default: 0,
    postgresql: {columnName: 'sub_total'},
  })
  subtotal?: number;

  @property({
    type: 'number',
    default: 0,
    postgresql: {columnName: 'tax_total'},
  })
  taxTotal?: number;

  @property({
    type: 'number',
    default: 0,
    postgresql: {columnName: 'retention_total'},
  })
  retentionTotal?: number;

  @property({
    type: 'string',
  })
  notes?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'expected_delivery_date'},
  })
  expectedDeliveryDate?: Date;

  @property({
    type: 'string',
    default: 'DRAFT',
  })
  status?: string;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt?: Date;

  constructor(data?: Partial<PurchaseOrderModel>)  { super(); /* Inyectado por constructor */ }
}
