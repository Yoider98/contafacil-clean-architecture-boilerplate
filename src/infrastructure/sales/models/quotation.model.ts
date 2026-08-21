import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'quotations'},
    strict: true,
  },
})
export class QuotationModel extends Entity {
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
    postgresql: {columnName: 'third_party_id'},
  })
  thirdPartyId: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'issue_date'},
  })
  issueDate: Date;

  @property({
    type: 'number',
    default: 15,
    postgresql: {columnName: 'validity_days'},
  })
  validityDays?: number;

  @property({
    type: 'string',
    default: 'COP',
  })
  currency?: string;

  @property({
    type: 'string',
  })
  notes?: string;

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
    type: 'number',
    default: 0,
  })
  total?: number;

  @property({
    type: 'string',
    default: 'DRAFT',
  })
  status?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'invoice_id'},
  })
  invoiceId?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'invoice_number'},
  })
  invoiceNumber?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'receipt_id'},
  })
  receiptId?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'receipt_number'},
  })
  receiptNumber?: string;

  @property({
    type: 'date',
    default: new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt: Date;

  constructor(data?: Partial<QuotationModel>)  { super(); /* Inyectado por constructor */ }
}
