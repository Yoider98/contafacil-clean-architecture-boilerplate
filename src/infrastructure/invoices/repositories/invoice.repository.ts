import {inject} from '@loopback/core';
import {DefaultCrudRepository, AnyObject} from '@loopback/repository';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {InvoiceModel} from '../models/invoice.model';
import {IInvoiceRepository} from '../../../domain/invoices/repositories/invoice.repository';
import {Invoice} from '../../../domain/invoices/entities/invoice.entity';
import InvoiceMapper from '../mappers/invoice.mapper';

export class InvoiceRepository implements IInvoiceRepository {
  private lbRepository: DefaultCrudRepository<
    InvoiceModel,
    typeof InvoiceModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(InvoiceModel, dataSource);
  }

  async create(invoice: Invoice, options?: AnyObject): Promise<Invoice>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string, options?: AnyObject): Promise<Invoice | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }}, options);
    return model ? InvoiceMapper.toDomain(model) : null;
  }

  async update(invoice: Invoice, options?: AnyObject): Promise<Invoice>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findByCompany(companyId: string): Promise<Invoice[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    return models.map(InvoiceMapper.toDomain);
  }
}
