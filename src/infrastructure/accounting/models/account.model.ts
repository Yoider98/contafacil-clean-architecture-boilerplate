import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'accounts'},
    strict: true,
  },
})
export class AccountModel extends Entity {
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
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
  })
  type?: string;

  @property({
    type: 'string',
    required: false,
  })
  description?: string;

  constructor(data?: Partial<AccountModel>)  { super(); /* Inyectado por constructor */ }
}
