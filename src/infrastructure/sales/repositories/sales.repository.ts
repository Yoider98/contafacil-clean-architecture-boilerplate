import {ISalesRepository} from '../../../domain/sales/repositories/sales.repository.interface';
import {Sales} from '../../../domain/sales/entities/sales.entity';
import {SalesModel} from '../models/sales.model';
import {SalesMapper} from '../mappers/sales.mapper';
import {inject} from '@loopback/core';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {DefaultCrudRepository} from '@loopback/repository';

export class SalesRepository implements ISalesRepository {
  private lbRepository: DefaultCrudRepository<SalesModel, string>;
  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(SalesModel, dataSource);
  }
  async create(sales: Sales): Promise<Sales>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<Sales>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    return SalesMapper.toSalesDomain(model);
  }
  async findAll(): Promise<Sales[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
