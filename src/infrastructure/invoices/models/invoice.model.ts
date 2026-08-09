import {Entity, model, property} from '@loopback/repository';
import DocumentStatus from '../../../domain/shared/enums/document-status.enum';
import DianStatus from '../../../domain/invoices/enums/dian-status.enum';

@model({
  settings: {postgresql: {schema: 'public', table: 'invoices'}, strict: true},
})
export class InvoiceModel extends Entity {
  @property({type: 'string', id: true, generated: false})
  id?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'company_id'},
  })
  companyId: string;

  @property({type: 'string', postgresql: {columnName: 'resolution_id'}})
  resolutionId?: string;

  @property({type: 'string', postgresql: {columnName: 'number'}})
  number?: string;

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

  @property({type: 'number', postgresql: {columnName: 'rete_fuente'}})
  reteFuente?: number;

  @property({type: 'number', postgresql: {columnName: 'rete_iva'}})
  reteIVA?: number;

  @property({type: 'number', postgresql: {columnName: 'rete_ica'}})
  reteICA?: number;

  @property({type: 'number', postgresql: {columnName: 'total'}})
  total?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'status'},
    jsonSchema: {enum: Object.values(DocumentStatus)},
  })
  status: string;

  @property({type: 'string', postgresql: {columnName: 'cufe'}})
  cufe?: string;

  @property({type: 'string', postgresql: {columnName: 'qr'}})
  qr?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'dian_status'},
    jsonSchema: {enum: Object.values(DianStatus)},
  })
  dianStatus?: string;

  @property({type: 'string', postgresql: {columnName: 'dian_message'}})
  dianMessage?: string;

  @property({type: 'string', postgresql: {columnName: 'xml_payload'}})
  xmlPayload?: string;

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

  constructor(data?: Partial<InvoiceModel>)  { super(); /* Inyectado por constructor */ }
}
