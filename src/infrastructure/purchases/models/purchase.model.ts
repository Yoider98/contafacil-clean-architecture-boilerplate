import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'purchases'},
    strict: true,
  },
})
export class PurchaseModel extends Entity {
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
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt?: Date;

  constructor(data?: Partial<PurchaseModel>)  { super(); /* Inyectado por constructor */ }
}
