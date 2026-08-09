import {AuditLog} from '../entities/audit-log.entity';

export interface IAuditLogRepository {
  create(auditLog: AuditLog): Promise<AuditLog>;
  find(filter?: object): Promise<AuditLog[]>;
  findByEntity(entityName: string, entityId: string): Promise<AuditLog[]>;
}
