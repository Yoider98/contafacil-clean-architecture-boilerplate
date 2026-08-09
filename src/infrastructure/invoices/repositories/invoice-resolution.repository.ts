import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {InvoiceResolutionModel} from '../models/invoice-resolution.model';
import {IInvoiceResolutionRepository} from '../../../domain/invoices/repositories/invoice-resolution.repository';
import {
  InvoiceResolution,
  InvoiceDocumentType,
} from '../../../domain/invoices/entities/invoice-resolution.entity';
import DocumentStatus from '../../../domain/shared/enums/document-status.enum';
import {InvoiceResolutionMapper} from '../mappers/invoice-resolution.mapper';

export class InvoiceResolutionRepository implements IInvoiceResolutionRepository {
  private lbRepository: DefaultCrudRepository<
    InvoiceResolutionModel,
    typeof InvoiceResolutionModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(
      InvoiceResolutionModel,
      dataSource,
    );
  }

  async create(resolution: InvoiceResolution): Promise<InvoiceResolution>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(
    id: string,
    companyId: string,
  ): Promise<InvoiceResolution | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return model ? InvoiceResolutionMapper.toDomain(model) : null;
  }

  async findByPrefix(
    companyId: string,
    prefix: string,
  ): Promise<InvoiceResolution | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return model ? InvoiceResolutionMapper.toDomain(model) : null;
  }

  async findActiveByDocumentType(
    companyId: string,
    documentType: InvoiceDocumentType,
  ): Promise<InvoiceResolution | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return model ? InvoiceResolutionMapper.toDomain(model) : null;
  }

  async findAll(companyId: string): Promise<InvoiceResolution[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return models.map(InvoiceResolutionMapper.toDomain);
  }

  async update(resolution: InvoiceResolution): Promise<InvoiceResolution>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async incrementAndGetNextNumber(
    id: string,
    companyId: string,
  ): Promise<string>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    if (!resolution.isValidAt()) {
      throw new Error(
        `La resolución ${resolution.prefix} se encuentra vencida`,
      );
    }

    if (
      resolution.status === DocumentStatus.APPROVED ||
      resolution.status === DocumentStatus.ANNULLED
    )  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }`,
      );
    }

    const formatted = resolution.getFormattedNextNumber();
    resolution.incrementNumber();
    await this.update(resolution);
    return formatted;
  }
}
