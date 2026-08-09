import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, response, Response, RestBindings} from '@loopback/rest';
import {AuditLogRepository} from '../../../infrastructure/audit/repositories/audit-log.repository';
import {GetAuditLogsUseCase} from '../../../application/audit/use-cases/get-audit-logs.use-case';
import {ApiResponse} from '../../../shared/responses/api.response';

export class AuditController {
  constructor(
    @repository(AuditLogRepository)
    private auditRepository: AuditLogRepository,
    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
  ) {}

  @get('/audit-logs')
  @response(200, {description: 'Obtiene el registro de auditoría'})
  async getAuditLogs(
    @param.query.string('companyId') companyId: string,
    @param.query.string('entityName') entityName?: string,
    @param.query.string('entityId') entityId?: string,
  ) {
    try {
      const useCase = new GetAuditLogsUseCase(this.auditRepository);
      const logs = await useCase.execute(companyId, entityName, entityId);
      return ApiResponse.success(logs, 'Registros de auditoría recuperados');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
