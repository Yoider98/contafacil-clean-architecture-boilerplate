import {Entity, model, property} from '@loopback/repository';
@model({
  settings: {
    postgresql: {schema: 'public', table: 'sales'},
    strict: true,
  },
})
export class SalesModel extends Entity {
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
    required: true,
    postgresql: {columnName: 'payment_method'},
  })
  paymentMethod: string;

  @property({
    type: 'date',
    default: new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt: Date;

  constructor(data?: Partial<SalesModel>)  { super(); /* Inyectado por constructor */ }
}
