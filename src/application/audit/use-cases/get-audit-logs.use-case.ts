import {IAuditLogRepository} from '../../../domain/audit/repositories/audit-log.repository.interface';
import {AuditLog} from '../../../domain/audit/entities/audit-log.entity';

export class GetAuditLogsUseCase {
  constructor(private auditRepository: IAuditLogRepository)  { /* Inyectado por constructor */ }

  async execute(
    companyId: string,
    entityName?: string,
    entityId?: string,
  ): Promise<AuditLog[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } : {}),
        ...(entityId ? {entityId} : {}),
      },
      order: ['createdAt DESC'],
    };

    return this.auditRepository.find(filter);
  }
}
