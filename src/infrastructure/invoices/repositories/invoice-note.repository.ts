import {inject} from '@loopback/core';
import {DefaultCrudRepository, AnyObject} from '@loopback/repository';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {InvoiceNoteModel} from '../models/invoice-note.model';
import {IInvoiceNoteRepository} from '../../../domain/invoices/repositories/invoice-note.repository';
import {InvoiceNote} from '../../../domain/invoices/entities/invoice-note.entity';
import {InvoiceNoteMapper} from '../mappers/invoice-note.mapper';

export class InvoiceNoteRepository implements IInvoiceNoteRepository {
  private lbRepository: DefaultCrudRepository<
    InvoiceNoteModel,
    typeof InvoiceNoteModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(InvoiceNoteModel, dataSource);
  }

  async create(note: InvoiceNote, options?: AnyObject): Promise<InvoiceNote>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string, companyId: string): Promise<InvoiceNote | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return model ? InvoiceNoteMapper.toDomain(model) : null;
  }

  async findByInvoice(
    invoiceId: string,
    companyId: string,
  ): Promise<InvoiceNote[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return models.map(InvoiceNoteMapper.toDomain);
  }

  async countByCompany(companyId: string, noteType: string): Promise<number>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
    return countObj.count;
  }
}
