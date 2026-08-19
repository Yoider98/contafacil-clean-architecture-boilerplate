import {Entity, model, property} from '@loopback/repository';
import DianStatus from '../../../domain/invoices/enums/dian-status.enum';

@model({
  settings: {postgresql: {schema: 'public', table: 'invoice_notes'}, strict: true},
})
export class InvoiceNoteModel extends Entity {
  @property({type: 'string', id: true, generated: false})
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
    postgresql: {columnName: 'invoice_id'},
  })
  invoiceId: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'note_type'},
  })
  noteType: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'consecutive'},
  })
  consecutive: string;

  @property({type: 'string', postgresql: {columnName: 'concept'}})
  concept?: string;

  @property({
    type: 'array',
    itemType: 'object',
    postgresql: {columnName: 'items'},
  })
  items?: object[];

  @property({type: 'number', postgresql: {columnName: 'subtotal'}})
  subtotal?: number;

  @property({type: 'number', postgresql: {columnName: 'iva'}})
  iva?: number;

  @property({type: 'number', postgresql: {columnName: 'total'}})
  total?: number;

  @property({type: 'string', postgresql: {columnName: 'cude'}})
  cude?: string;

  @property({type: 'string', postgresql: {columnName: 'xml_payload'}})
  xmlPayload?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'dian_status'},
    jsonSchema: {enum: Object.values(DianStatus)},
  })
  dianStatus?: string;

  @property({type: 'string', postgresql: {columnName: 'dian_message'}})
  dianMessage?: string;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'updated_at'},
  })
  updatedAt?: Date;

  constructor(data?: Partial<InvoiceNoteModel>)  { super(); /* Inyectado por constructor */ }
}
