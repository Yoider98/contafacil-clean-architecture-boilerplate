import {inject} from '@loopback/core';
import {DefaultCrudRepository, AnyObject} from '@loopback/repository';
import AuditLogModel from '../models/audit-log.model';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import AuditLogMapper from '../mappers/audit-log.mapper';
import {AuditLog} from '../../../domain/audit/entities/audit-log.entity';
import {IAuditLogRepository} from '../../../domain/audit/repositories/audit-log.repository.interface';

export class AuditLogRepository implements IAuditLogRepository {
  private lbRepository: DefaultCrudRepository<
    AuditLogModel,
    typeof AuditLogModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(AuditLogModel, dataSource);
  }

  async create(auditLog: AuditLog): Promise<AuditLog>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async find(filter?: object): Promise<AuditLog[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findByEntity(
    entityName: string,
    entityId: string,
  ): Promise<AuditLog[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
      order: ['createdAt DESC'],
    });
    return models.map(AuditLogMapper.toDomain);
  }
}
