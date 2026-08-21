import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {DepartmentModel} from '../models/department.model';

export class DepartmentRepository extends DefaultCrudRepository<
  DepartmentModel,
  typeof DepartmentModel.prototype.id
> {
  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    super(DepartmentModel, dataSource);
  }
}
