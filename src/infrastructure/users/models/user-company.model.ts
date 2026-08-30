import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'user_companies'},
    strict: true,
  },
})
export class UserCompanyModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'user_id'},
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'company_id'},
  })
  companyId: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {enum: ['OWNER', 'ADMIN', 'SELLER']},
  })
  role: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: false,
    postgresql: {columnName: 'permissions', dataType: 'varchar[]'},
  })
  permissions?: string[];

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

  constructor(data?: Partial<UserCompanyModel>)  { super(); /* Inyectado por constructor */ }
}
