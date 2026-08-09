import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'ledger_entries'},
    strict: true,
  },
})
export class LedgerEntryModel extends Entity {
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
    postgresql: {columnName: 'account_id'},
  })
  accountId: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'reference_type'},
  })
  referenceType?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'reference_id'},
  })
  referenceId?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'third_party_id'},
  })
  thirdPartyId?: string;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt?: Date;

  constructor(data?: Partial<LedgerEntryModel>)  { super(); /* Inyectado por constructor */ }
}
