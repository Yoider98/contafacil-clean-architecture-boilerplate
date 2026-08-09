import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'cash_registers'},
    strict: true,
  },
})
export class CashRegisterModel extends Entity {
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
  date: string; // 'YYYY-MM-DD'

  @property({
    type: 'number',
    required: true,
    postgresql: {columnName: 'opening_balance'},
  })
  openingBalance: number;

  @property({
    type: 'number',
    required: false,
    postgresql: {columnName: 'closing_balance'},
  })
  closingBalance?: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt?: Date;

  constructor(data?: Partial<CashRegisterModel>)  { super(); /* Inyectado por constructor */ }
}
