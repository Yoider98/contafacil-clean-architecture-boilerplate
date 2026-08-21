import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QuotationItem} from '../../../domain/sales/entities/quotation-item.entity';
import {IQuotationItemRepository} from '../../../domain/sales/repositories/quotation.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {QuotationMapper} from '../mappers/quotation.mapper';
import {QuotationItemModel} from '../models/quotation-item.model';

export class QuotationItemRepository implements IQuotationItemRepository {
  private lbRepository: DefaultCrudRepository<QuotationItemModel, string>;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(QuotationItemModel, dataSource);
  }

  async create(quotationItem: QuotationItem, options?: any): Promise<QuotationItem>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<QuotationItem>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findAll(): Promise<QuotationItem[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findByQuotationId(quotationId: string): Promise<QuotationItem[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(m => QuotationMapper.toQuotationItemDomain(m));
  }
}
