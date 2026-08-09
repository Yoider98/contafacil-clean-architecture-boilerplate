import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Company} from '../../../domain/companies/entities/company.entity';
import {ICompanyRepository} from '../../../domain/companies/repositories/company.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {CompanyMapper} from '../mappers/company.mapper';
import {CompanyModel} from '../models/company.model';

export class CompanyRepository implements ICompanyRepository {
  private lbRepository: DefaultCrudRepository<CompanyModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(CompanyModel, dataSource);
  }

  async create(company: Company): Promise<Company>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async update(company: Company): Promise<Company>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<Company>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findAll(): Promise<Company[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
