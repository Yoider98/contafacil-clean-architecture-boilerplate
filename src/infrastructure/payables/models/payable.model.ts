import {Entity, model, property} from '@loopback/repository';

@model({settings: {postgresql: {schema: 'public', table: 'payables'}}})
export class PayableModel extends Entity {
  @property({type: 'string', id: true, postgresql: {columnName: 'id'}})
  id?: string;

  @property({type: 'string', postgresql: {columnName: 'company_id'}})
  companyId?: string;

  @property({type: 'string', postgresql: {columnName: 'third_party_id'}})
  thirdPartyId?: string;

  @property({type: 'string', postgresql: {columnName: 'document_ref'}})
  documentRef?: string;

  @property({type: 'number', postgresql: {columnName: 'amount'}})
  amount?: number;

  @property({type: 'number', postgresql: {columnName: 'balance'}})
  balance?: number;

  @property({type: 'date', postgresql: {columnName: 'due_date'}})
  dueDate?: string;

  @property({type: 'string', postgresql: {columnName: 'status'}})
  status?: string;

  @property({type: 'date', postgresql: {columnName: 'created_at'}})
  createdAt?: string;

  @property({type: 'date', postgresql: {columnName: 'updated_at'}})
  updatedAt?: string;

  constructor(data?: Partial<PayableModel>)  { super(); /* Inyectado por constructor */ }
}

export default PayableModel;
