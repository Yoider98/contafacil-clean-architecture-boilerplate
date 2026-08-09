import {Entity, model, property} from '@loopback/repository';
import {InvoiceDocumentType} from '../../../domain/invoices/entities/invoice-resolution.entity';
import DocumentStatus from '../../../domain/shared/enums/document-status.enum';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'invoice_resolutions'},
    strict: true,
  },
})
export class InvoiceResolutionModel extends Entity {
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
    postgresql: {columnName: 'resolution_number'},
  })
  resolutionNumber: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'prefix'},
  })
  prefix: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {columnName: 'from_number'},
  })
  fromNumber: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {columnName: 'to_number'},
  })
  toNumber: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {columnName: 'current_number'},
  })
  currentNumber: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'technical_key'},
  })
  technicalKey?: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'valid_from'},
  })
  validFrom: Date;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'valid_to'},
  })
  validTo: Date;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'document_type'},
    jsonSchema: {
      enum: Object.values(InvoiceDocumentType),
    },
  })
  documentType: InvoiceDocumentType;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'status'},
    jsonSchema: {
      enum: Object.values(DocumentStatus),
    },
  })
  status: string;

  @property({
    type: 'boolean',
    default: true,
    postgresql: {columnName: 'is_active'},
  })
  isActive?: boolean;

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

  constructor(data?: Partial<InvoiceResolutionModel>)  { super(); /* Inyectado por constructor */ }
}
