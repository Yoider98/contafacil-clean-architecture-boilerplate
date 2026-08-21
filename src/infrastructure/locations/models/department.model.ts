import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'departments'},
    strict: true,
  },
})
export class DepartmentModel extends Entity {
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
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

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

  constructor(data?: Partial<DepartmentModel>)  { super(); /* Inyectado por constructor */ }
}
