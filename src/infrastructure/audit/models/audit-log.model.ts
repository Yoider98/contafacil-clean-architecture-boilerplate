import {Entity, model, property} from '@loopback/repository';
import {AuditAction} from '../../../domain/audit/entities/audit-log.entity';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'audit_logs'},
  },
})
export default class AuditLogModel extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  companyId: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  action: AuditAction;

  @property({
    type: 'string',
    required: true,
  })
  entityName: string;

  @property({
    type: 'string',
    required: true,
  })
  entityId: string;

  @property({
    type: 'object',
    postgresql: {
      dataType: 'jsonb',
    },
  })
  oldSnapshot?: object;

  @property({
    type: 'object',
    postgresql: {
      dataType: 'jsonb',
    },
  })
  newSnapshot?: object;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt: Date;

  constructor(data?: Partial<AuditLogModel>)  { super(); /* Inyectado por constructor */ }
}

export interface AuditLogRelations {
  // describe navigational properties here
}

export type AuditLogWithRelations = AuditLogModel & AuditLogRelations;
