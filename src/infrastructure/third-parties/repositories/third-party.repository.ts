import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {ThirdPartyModel} from '../models/third-party.model';
import {IThirdPartyRepository} from '../../../domain/third-parties/repositories/third-party.repository';
import {
  ThirdParty,
  DocumentType,
  ThirdPartyRole,
} from '../../../domain/third-parties/entities/third-party.entity';
import {ThirdPartyMapper} from '../mappers/third-party.mapper';

export class ThirdPartyRepository implements IThirdPartyRepository {
  private lbRepository: DefaultCrudRepository<
    ThirdPartyModel,
    typeof ThirdPartyModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(ThirdPartyModel, dataSource);
  }

  async create(thirdParty: ThirdParty): Promise<ThirdParty>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string, companyId: string): Promise<ThirdParty | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return model ? ThirdPartyMapper.toDomain(model) : null;
  }

  async findByIdentification(
    companyId: string,
    documentType: string,
    identificationNumber: string,
  ): Promise<ThirdParty | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
    });
    return model ? ThirdPartyMapper.toDomain(model) : null;
  }

  async find(
    companyId: string,
    filter?:  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
  ): Promise<ThirdParty[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      companyId,
    };

    if (filter?.includeInactive)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    } else {
      where.isActive = filter?.isActive ?? true;
    }

    if (filter?.search)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }%`, options: 'i'}},
        {identificationNumber: {like: `%${filter.search}%`}},
      ];
    }

    const models = await this.lbRepository.find({where});
    let result = models.map(m => ThirdPartyMapper.toDomain(m));

    if (filter?.role)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    return result;
  }

  async update(thirdParty: ThirdParty): Promise<ThirdParty>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async delete(id: string, companyId: string): Promise<boolean>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
