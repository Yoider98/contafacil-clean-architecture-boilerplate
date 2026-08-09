import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'companies'},
    strict: true,
  },
})
export class CompanyModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  plan: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'image_url'},
  })
  imageUrl?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'phone_number'},
  })
  phoneNumber: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'address'},
  })
  address: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'city'},
  })
  city: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'department'},
  })
  department: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'country'},
  })
  country: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'contact_email'},
  })
  contactEmail: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'website'},
  })
  website?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'postal_code'},
  })
  postalCode?: string;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'created_at'},
  })
  createdAt: Date;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'updated_at'},
  })
  updatedAt: Date;

  @property({
    type: 'string',
    postgresql: {columnName: 'nit'},
  })
  nit?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'dv'},
  })
  dv?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'person_type'},
  })
  personType?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'tax_regime'},
  })
  taxRegime?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'economic_activity_code'},
  })
  economicActivityCode?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'company_type'},
  })
  companyType?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'merchant_register'},
  })
  merchantRegister?: string;

  @property({
    type: 'array',
    itemType: 'string',
    postgresql: {columnName: 'tax_obligations'},
  })
  taxObligations?: string[];

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {columnName: 'deleted_at'},
  })
  deletedAt?: Date;

  constructor(data?: Partial<CompanyModel>)  { super(); /* Inyectado por constructor */ }
}
