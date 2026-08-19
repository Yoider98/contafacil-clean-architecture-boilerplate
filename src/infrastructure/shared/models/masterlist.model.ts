import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'masterlists'},
    strict: true,
  },
})
export class MasterlistModel extends Entity {
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
  category: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
  })
  description?: string;

  @property({
    type: 'boolean',
    default: true,
    postgresql: {columnName: 'is_active'},
  })
  isActive?: boolean;

  @property({
    type: 'date',
    postgresql: {columnName: 'valid_from'},
  })
  validFrom?: Date;

  @property({
    type: 'date',
    postgresql: {columnName: 'valid_to'},
  })
  validTo?: Date;

  @property({
    type: 'object',
    required: false,
    postgresql: {dataType: 'jsonb'},
  })
  metadata?: Record<string, any>;

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

  constructor(data?: Partial<MasterlistModel>)  { super(); /* Inyectado por constructor */ }
}
