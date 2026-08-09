import {Entity, model, property} from '@loopback/repository';
import {
  PersonType,
  TaxRegime,
} from '../../../domain/companies/enums/company-fiscal.enum';
import {
  DocumentType,
  ThirdPartyRole,
} from '../../../domain/third-parties/entities/third-party.entity';

@model({name: 'third_parties'})
export class ThirdPartyModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  companyId: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(PersonType),
    },
  })
  personType: PersonType;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(DocumentType),
    },
  })
  documentType: DocumentType;

  @property({
    type: 'string',
    required: true,
  })
  identificationNumber: string;

  @property({
    type: 'string',
  })
  dv?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  tradeName?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  roles: ThirdPartyRole[];

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(TaxRegime),
    },
  })
  taxRegime: TaxRegime;

  @property({
    type: 'string',
  })
  economicActivityCode?: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  cityCode: string;

  @property({
    type: 'string',
    required: true,
  })
  departmentCode: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isSelfRetainer?: boolean;

  @property({
    type: 'boolean',
    default: true,
  })
  isActive?: boolean;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: Date;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  updatedAt?: Date;

  constructor(data?: Partial<ThirdPartyModel>)  { super(); /* Inyectado por constructor */ }
}
