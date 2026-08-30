import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'users'},
    strict: true,
  },
})
export class UserModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: false,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
  })
  email: string;

  @property({
    type: 'string',
    required: false,
  })
  password: string;

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
    type: 'date',
    postgresql: {columnName: 'deleted_at'},
  })
  deletedAt?: Date;

  @property({
    type: 'boolean',
    default: true,
    postgresql: {columnName: 'is_active'},
  })
  isActive?: boolean;

  constructor(data?: Partial<UserModel>)  { super(); /* Inyectado por constructor */ }
}
