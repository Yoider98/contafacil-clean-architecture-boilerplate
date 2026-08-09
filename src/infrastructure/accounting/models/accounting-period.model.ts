import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {postgresql: {schema: 'public', table: 'accounting_periods'}},
})
export class AccountingPeriodModel extends Entity {
  @property({
    type: 'string',
    id: true,
    postgresql: {columnName: 'id'},
  })
  id?: string;

  @property({type: 'string', postgresql: {columnName: 'company_id'}})
  companyId?: string;

  @property({type: 'date', postgresql: {columnName: 'from_date'}})
  fromDate?: string;

  @property({type: 'date', postgresql: {columnName: 'to_date'}})
  toDate?: string;

  @property({type: 'string', postgresql: {columnName: 'status'}})
  status?: string;

  @property({type: 'date', postgresql: {columnName: 'created_at'}})
  createdAt?: string;

  @property({type: 'date', postgresql: {columnName: 'updated_at'}})
  updatedAt?: string;

  constructor(data?: Partial<AccountingPeriodModel>)  { super(); /* Inyectado por constructor */ }
}

export default AccountingPeriodModel;
