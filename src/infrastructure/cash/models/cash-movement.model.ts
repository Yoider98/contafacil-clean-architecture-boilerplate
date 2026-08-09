import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'cash_movements'},
    strict: true,
  },
})
export class CashMovementModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'cash_register_id'},
  })
  cashRegisterId: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string; // 'IN' | 'OUT'

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: false,
  })
  category?: string;

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
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt?: Date;

  constructor(data?: Partial<CashMovementModel>)  { super(); /* Inyectado por constructor */ }
}
