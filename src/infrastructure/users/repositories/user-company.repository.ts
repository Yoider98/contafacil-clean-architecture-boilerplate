import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {UserCompanyModel} from '../models/user-company.model';

export class UserCompanyRepository extends DefaultCrudRepository<
  UserCompanyModel,
  typeof UserCompanyModel.prototype.id
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(UserCompanyModel, dataSource);
  }
}
