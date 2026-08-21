import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'cities'},
    strict: true,
  },
})
export class CityModel extends Entity {
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
    type: 'string',
    required: true,
    postgresql: {columnName: 'department_code'},
  })
  departmentCode: string;

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

  constructor(data?: Partial<CityModel>)  { super(); /* Inyectado por constructor */ }
}
