import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {CityModel} from '../models/city.model';

export class CityRepository extends DefaultCrudRepository<
  CityModel,
  typeof CityModel.prototype.id
> {
  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    super(CityModel, dataSource);
  }
}
