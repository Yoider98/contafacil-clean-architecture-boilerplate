import {AuditLogRepository} from '../../../infrastructure/audit/repositories/audit-log.repository';
import {
  AuditLog,
  AuditAction,
} from '../../../domain/audit/entities/audit-log.entity';

export interface AuditContext {
  companyId: string;
  userId: string;
  action: AuditAction;
  entityName: string;
  entityId: string;
  oldSnapshot?: object;
  newSnapshot?: object;
}

export class AuditService {
  constructor(private auditRepository: AuditLogRepository)  { /* Inyectado por constructor */ }

  async logAction(context: AuditContext): Promise<void>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
      await this.auditRepository.create(log);
    } catch (error)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
  }
}
