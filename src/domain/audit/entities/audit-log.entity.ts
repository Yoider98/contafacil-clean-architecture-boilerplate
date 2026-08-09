export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class AuditLog {
  public id: string;
  public companyId: string;
  public userId: string;
  public action: AuditAction;
  public entityName: string;
  public entityId: string;
  public oldSnapshot: object | null;
  public newSnapshot: object | null;
  public createdAt: Date;

  constructor(data: Partial<AuditLog>) {
    this.id = data.id ?? '';
    this.companyId = data.companyId ?? '';
    this.userId = data.userId ?? '';
    this.action = data.action ?? AuditAction.CREATE;
    this.entityName = data.entityName ?? '';
    this.entityId = data.entityId ?? '';
    this.oldSnapshot = data.oldSnapshot ?? null;
    this.newSnapshot = data.newSnapshot ?? null;
    this.createdAt = data.createdAt ?? new Date();
  }
}
