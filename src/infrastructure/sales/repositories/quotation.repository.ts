import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Quotation} from '../../../domain/sales/entities/quotation.entity';
import {IQuotationRepository} from '../../../domain/sales/repositories/quotation.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {QuotationMapper} from '../mappers/quotation.mapper';
import {QuotationModel} from '../models/quotation.model';

export class QuotationRepository implements IQuotationRepository {
  private lbRepository: DefaultCrudRepository<QuotationModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(QuotationModel, dataSource);
  }

  async create(quotation: Quotation, options?: any): Promise<Quotation>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<Quotation>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findAll(): Promise<Quotation[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findAllByCompany(companyId: string): Promise<Quotation[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => QuotationMapper.toQuotationDomain(m));
  }
}
