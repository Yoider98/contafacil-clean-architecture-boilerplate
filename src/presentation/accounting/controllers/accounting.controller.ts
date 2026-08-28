import {inject} from '@loopback/core';
import {
  get,
  param,
  post,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {
  CreateAccountDto,
  CreateAccountUseCase,
} from '../../../application/accounting/use-cases/create-account.use-case';
import {ReportExporterService} from '../../../application/accounting/services/report-exporter.service';
import {
  CreateFiscalRegimeDto,
  CreateFiscalRegimeUseCase,
} from '../../../application/accounting/use-cases/create-fiscal-regime.use-case';
import {ListFiscalRegimesUseCase} from '../../../application/accounting/use-cases/list-fiscal-regimes.use-case';
import {
  CreateLedgerEntryDto,
  CreateLedgerEntryUseCase,
} from '../../../application/accounting/use-cases/create-ledger-entry.use-case';
import {Account} from '../../../domain/accounting/entities/account.entity';
import {FiscalRegime} from '../../../domain/accounting/entities/fiscal-regime.entity';
import {LedgerEntry} from '../../../domain/accounting/entities/ledger-entry.entity';
import {GetTrialBalanceUseCase} from '../../../application/accounting/use-cases/get-trial-balance.use-case';
import {GetGeneralLedgerUseCase} from '../../../application/accounting/use-cases/get-general-ledger.use-case';
import {GetThirdPartyAuxiliaryUseCase} from '../../../application/accounting/use-cases/get-third-party-auxiliary.use-case';
import {COLOMBIA_PUC_ACCOUNTS} from '../../../domain/accounting/data/colombia-puc.data';
import {AccountRepository} from '../../../infrastructure/accounting/repositories/account.repository';
import {FiscalRegimeRepository} from '../../../infrastructure/accounting/repositories/fiscal-regime.repository';
import {LedgerEntryRepository} from '../../../infrastructure/accounting/repositories/ledger-entry.repository';
import {repository} from '@loopback/repository';
import {ApiResponse} from '../../../shared/responses/api.response';

export class AccountingController {
  constructor(
    @repository(AccountRepository)
    private accountRepository: AccountRepository,
    @repository(FiscalRegimeRepository)
    private fiscalRegimeRepository: FiscalRegimeRepository,
    @repository(LedgerEntryRepository)
    private ledgerEntryRepository: LedgerEntryRepository,
    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
    @inject('currentCompanyId')
    private currentCompanyId: string,
  ) {}

  // -----------------------------------------------------------
  // CUENTAS CONTABLES
  // -----------------------------------------------------------

  // GET /accounts/puc/colombia — Listado del PUC (sin autenticación)
  @get('/accounts/puc/colombia')
  @response(200, {
    description: 'Plan Único de Cuentas (PUC) de Colombia',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {type: 'object'}},
          },
        },
      },
    },
  })
  async getColombiaPUC(): Promise<ApiResponse<object[]>> {
    return ApiResponse.success(
      COLOMBIA_PUC_ACCOUNTS,
      'PUC recuperado exitosamente',
    );
  }

  // POST /accounts — Crear cuenta contable
  @post('/accounts', {
    responses: {
      '201': {
        description: 'Cuenta contable creada',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': Account},
              },
            },
          },
        },
      },
    },
  })
  async createAccount(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['code', 'name'],
            properties: {
              companyId: {type: 'string'},
              code: {
                type: 'string',
                description:
                  'Número de cuenta PUC (ej: "1435", "4135", "6135")',
              },
              name: {type: 'string'},
              type: {
                type: 'string',
                description:
                  'Tipo de cuenta (texto libre: Activo, Pasivo, Ingreso, Gasto, Costo...)',
              },
              description: {
                type: 'string',
                description: 'Descripción adicional de la cuenta',
              },
            },
          },
        },
      },
    })
    dto: CreateAccountDto,
  ): Promise<ApiResponse<Account>> {
    try {
      this.responseObj.status(201);
      dto.companyId = this.currentCompanyId;
      const result = await new CreateAccountUseCase(
        this.accountRepository,
      ).execute(dto);
      return ApiResponse.success(result, 'Cuenta contable creada exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /accounts?companyId= — Listar cuentas de una empresa
  @get('/accounts')
  @response(200, {
    description: 'Lista de cuentas contables',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': Account}},
          },
        },
      },
    },
  })
  async findAllAccounts(
    @param.query.string('companyId') companyId: string,
  ): Promise<ApiResponse<Account[]>> {
    try {
      if (!companyId) {
        return ApiResponse.error('companyId is required');
      }
      const accounts = await this.accountRepository.findAll(companyId);
      return ApiResponse.success(
        accounts,
        'Cuentas contables recuperadas exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /accounts/{id} — Detalle de cuenta
  @get('/accounts/{id}')
  @response(200, {
    description: 'Detalle de la cuenta contable',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {'x-ts-type': Account},
          },
        },
      },
    },
  })
  async findAccountById(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<Account>> {
    try {
      const account = await this.accountRepository.findById(id);
      return ApiResponse.success(
        account,
        'Cuenta contable recuperada exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // POST /fiscal-regimes — Crear régimen fiscal
  @post('/fiscal-regimes', {
    responses: {
      '201': {
        description: 'Régimen fiscal creado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': FiscalRegime},
              },
            },
          },
        },
      },
    },
  })
  async createFiscalRegime(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['code', 'name'],
            properties: {
              companyId: {type: 'string'},
              code: {
                type: 'string',
                description: 'Código del régimen fiscal (ej: "Régimen común")',
              },
              name: {type: 'string'},
              description: {type: 'string'},
              active: {type: 'boolean'},
            },
          },
        },
      },
    })
    dto: CreateFiscalRegimeDto,
  ): Promise<ApiResponse<FiscalRegime>> {
    try {
      this.responseObj.status(201);
      dto.companyId = this.currentCompanyId;
      const result = await new CreateFiscalRegimeUseCase(
        this.fiscalRegimeRepository,
      ).execute(dto);
      return ApiResponse.success(result, 'Régimen fiscal creado exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /fiscal-regimes?companyId= — Listar regímenes fiscales de una empresa
  @get('/fiscal-regimes')
  @response(200, {
    description: 'Lista de regímenes fiscales',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': FiscalRegime}},
          },
        },
      },
    },
  })
  async findFiscalRegimes(
    @param.query.string('companyId') companyId: string,
  ): Promise<ApiResponse<FiscalRegime[]>> {
    try {
      if (!companyId) {
        return ApiResponse.error('companyId is required');
      }
      const regimes = await new ListFiscalRegimesUseCase(
        this.fiscalRegimeRepository,
      ).execute(companyId);
      return ApiResponse.success(
        regimes,
        'Regímenes fiscales recuperados exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /fiscal-regimes/{id} — Detalle de régimen fiscal
  @get('/fiscal-regimes/{id}')
  @response(200, {
    description: 'Detalle del régimen fiscal',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {'x-ts-type': FiscalRegime},
          },
        },
      },
    },
  })
  async findFiscalRegimeById(
    @param.path.string('id') id: string,
  ): Promise<ApiResponse<FiscalRegime>> {
    try {
      const regime = await this.fiscalRegimeRepository.findById(id);
      return ApiResponse.success(
        regime,
        'Régimen fiscal recuperado exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // -----------------------------------------------------------
  // ASIENTOS CONTABLES (LEDGER ENTRIES)
  // -----------------------------------------------------------

  // POST /ledger-entries — Registrar asiento
  @post('/ledger-entries', {
    responses: {
      '201': {
        description: 'Asiento contable registrado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': LedgerEntry},
              },
            },
          },
        },
      },
    },
  })
  async createEntry(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['companyId', 'accountId', 'amount'],
            properties: {
              companyId: {type: 'string'},
              accountId: {type: 'string'},
              amount: {
                type: 'number',
                description:
                  'Positivo (crédito) o negativo (débito). No puede ser 0.',
              },
              referenceType: {type: 'string'},
              referenceId: {type: 'string'},
            },
          },
        },
      },
    })
    dto: CreateLedgerEntryDto,
  ): Promise<ApiResponse<LedgerEntry>> {
    try {
      this.responseObj.status(201);
      const result = await new CreateLedgerEntryUseCase(
        this.accountRepository,
        this.ledgerEntryRepository,
      ).execute(dto);
      return ApiResponse.success(
        result,
        'Asiento contable registrado exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // GET /ledger-entries?accountId= — Asientos por cuenta
  @get('/ledger-entries')
  @response(200, {
    description: 'Lista de asientos contables',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {type: 'boolean'},
            message: {type: 'string'},
            data: {type: 'array', items: {'x-ts-type': LedgerEntry}},
          },
        },
      },
    },
  })
  async findEntries(
    @param.query.string('accountId') accountId: string,
    @param.query.string('companyId') companyId: string,
  ): Promise<ApiResponse<LedgerEntry[]>> {
    try {
      let result: LedgerEntry[] = [];
      const activeCompanyId = companyId || this.currentCompanyId;

      if (accountId) {
        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        let accountCode = '';

        if (UUID_REGEX.test(accountId)) {
          try {
            const acc = await this.accountRepository.findById(accountId);
            accountCode = acc.code;
          } catch (err) {
            result = await this.ledgerEntryRepository.findByAccount(accountId);
            return ApiResponse.success(result, 'Asientos contables recuperados exitosamente');
          }
        } else {
          accountCode = accountId;
        }

        const allCompanyAccounts = await this.accountRepository.findAll(activeCompanyId);
        const matchingAccountIds = allCompanyAccounts
          .filter(acc => acc.code.startsWith(accountCode))
          .map(acc => acc.id)
          .filter(Boolean) as string[];

        if (matchingAccountIds.length > 0) {
          const allEntries = await this.ledgerEntryRepository.findByCompany(activeCompanyId);
          result = allEntries.filter(entry => matchingAccountIds.includes(entry.accountId));
        } else {
          result = [];
        }
      } else if (activeCompanyId) {
        result = await this.ledgerEntryRepository.findByCompany(activeCompanyId);
      } else {
        return ApiResponse.error('accountId or companyId is required');
      }

      return ApiResponse.success(
        result,
        'Asientos contables recuperados exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  // -----------------------------------------------------------
  // REPORTES CONTABLES
  // -----------------------------------------------------------

  @get('/accounting/reports/trial-balance')
  @response(200, {description: 'Obtiene el Balance de Comprobación'})
  async getTrialBalance(
    @param.query.string('startDate') startDate?: string,
    @param.query.string('endDate') endDate?: string,
  ) {
    try {
      const useCase = new GetTrialBalanceUseCase(
        this.accountRepository,
        this.ledgerEntryRepository,
      );
      const result = await useCase.execute(this.currentCompanyId, startDate, endDate);
      return ApiResponse.success(result, 'Balance de Comprobación recuperado');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/accounting/reports/general-ledger')
  @response(200, {description: 'Obtiene el Libro Mayor'})
  async getGeneralLedger(
    @param.query.string('startDate') startDate?: string,
    @param.query.string('endDate') endDate?: string,
  ) {
    try {
      const useCase = new GetGeneralLedgerUseCase(
        this.accountRepository,
        this.ledgerEntryRepository,
      );
      const result = await useCase.execute(this.currentCompanyId, startDate, endDate);
      return ApiResponse.success(result, 'Libro Mayor recuperado');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/accounting/reports/third-party-auxiliary')
  @response(200, {description: 'Obtiene el Auxiliar por Tercero'})
  async getThirdPartyAuxiliary(
    @param.query.string('thirdPartyId') thirdPartyId: string,
    @param.query.string('startDate') startDate?: string,
    @param.query.string('endDate') endDate?: string,
  ) {
    try {
      if (!thirdPartyId) return ApiResponse.error('thirdPartyId is required');
      const useCase = new GetThirdPartyAuxiliaryUseCase(
        this.accountRepository,
        this.ledgerEntryRepository,
      );
      const result = await useCase.execute(
        this.currentCompanyId,
        thirdPartyId,
        startDate,
        endDate,
      );
      return ApiResponse.success(result, 'Auxiliar por Tercero recuperado');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/accounting/reports/trial-balance/export')
  @response(200, {description: 'Exporta el Balance de Comprobación a Excel/PDF'})
  async exportTrialBalance(
    @param.query.string('format') format: 'excel' | 'pdf',
    @param.query.string('startDate') startDate?: string,
    @param.query.string('endDate') endDate?: string,
  ) {
    try {
      if (format !== 'excel' && format !== 'pdf') return this.responseObj.status(400).send('format debe ser excel o pdf');

      const useCase = new GetTrialBalanceUseCase(this.accountRepository, this.ledgerEntryRepository);
      const data = await useCase.execute(this.currentCompanyId, startDate, endDate);

      const columns = [
        {header: 'Código', key: 'accountCode', width: 60, format: 'text'},
        {header: 'Nombre de Cuenta', key: 'accountName', width: '*', format: 'text'},
        {header: 'Saldo Inicial', key: 'initialBalance', width: 80, format: 'currency'},
        {header: 'Débitos', key: 'debits', width: 80, format: 'currency'},
        {header: 'Créditos', key: 'credits', width: 80, format: 'currency'},
        {header: 'Saldo Final', key: 'finalBalance', width: 80, format: 'currency'},
      ] as any;

      const exporter = new ReportExporterService();
      if (format === 'excel') {
        const buffer = exporter.exportToExcel(data, columns, 'Balance de Comprobación');
        this.responseObj.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        this.responseObj.header('Content-Disposition', 'attachment; filename="balance_comprobacion.xlsx"');
        return this.responseObj.send(buffer);
      } else {
        const buffer = await exporter.exportToPdf(data, columns, 'Balance de Comprobación');
        this.responseObj.header('Content-Type', 'application/pdf');
        this.responseObj.header('Content-Disposition', 'attachment; filename="balance_comprobacion.pdf"');
        return this.responseObj.send(buffer);
      }
    } catch (err: any) {
      return this.responseObj.status(500).send(err.message || 'Error exportando');
    }
  }

  @get('/accounting/reports/general-ledger/export')
  @response(200, {description: 'Exporta el Libro Mayor a Excel/PDF'})
  async exportGeneralLedger(
    @param.query.string('format') format: 'excel' | 'pdf',
    @param.query.string('startDate') startDate?: string,
    @param.query.string('endDate') endDate?: string,
  ) {
    try {
      if (format !== 'excel' && format !== 'pdf') return this.responseObj.status(400).send('format debe ser excel o pdf');

      const useCase = new GetGeneralLedgerUseCase(this.accountRepository, this.ledgerEntryRepository);
      const data = await useCase.execute(this.currentCompanyId, startDate, endDate);

      const columns = [
        {header: 'Cuenta Mayor', key: 'majorCode', width: 80, format: 'text'},
        {header: 'Saldo Inicial', key: 'initialBalance', width: '*', format: 'currency'},
        {header: 'Débitos', key: 'debits', width: '*', format: 'currency'},
        {header: 'Créditos', key: 'credits', width: '*', format: 'currency'},
        {header: 'Saldo Final', key: 'finalBalance', width: '*', format: 'currency'},
      ] as any;

      const exporter = new ReportExporterService();
      if (format === 'excel') {
        const buffer = exporter.exportToExcel(data, columns, 'Libro Mayor');
        this.responseObj.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        this.responseObj.header('Content-Disposition', 'attachment; filename="libro_mayor.xlsx"');
        return this.responseObj.send(buffer);
      } else {
        const buffer = await exporter.exportToPdf(data, columns, 'Libro Mayor');
        this.responseObj.header('Content-Type', 'application/pdf');
        this.responseObj.header('Content-Disposition', 'attachment; filename="libro_mayor.pdf"');
        return this.responseObj.send(buffer);
      }
    } catch (err: any) {
      return this.responseObj.status(500).send(err.message || 'Error exportando');
    }
  }

  @get('/accounting/reports/third-party-auxiliary/export')
  @response(200, {description: 'Exporta el Auxiliar por Tercero a Excel/PDF'})
  async exportThirdPartyAuxiliary(
    @param.query.string('thirdPartyId') thirdPartyId: string,
    @param.query.string('format') format: 'excel' | 'pdf',
    @param.query.string('startDate') startDate?: string,
    @param.query.string('endDate') endDate?: string,
  ) {
    try {
      if (!thirdPartyId) return this.responseObj.status(400).send('thirdPartyId is required');
      if (format !== 'excel' && format !== 'pdf') return this.responseObj.status(400).send('format debe ser excel o pdf');

      const useCase = new GetThirdPartyAuxiliaryUseCase(this.accountRepository, this.ledgerEntryRepository);
      const data = await useCase.execute(this.currentCompanyId, thirdPartyId, startDate, endDate);

      const columns = [
        {header: 'Fecha', key: 'createdAt', width: 80, format: 'text'},
        {header: 'Referencia', key: 'referenceType', width: 60, format: 'text'},
        {header: 'Código', key: 'accountCode', width: 60, format: 'text'},
        {header: 'Nombre de Cuenta', key: 'accountName', width: '*', format: 'text'},
        {header: 'Tipo', key: 'type', width: 60, format: 'text'},
        {header: 'Monto', key: 'amount', width: 80, format: 'currency'},
      ] as any;

      const exporter = new ReportExporterService();
      if (format === 'excel') {
        const buffer = exporter.exportToExcel(data.movements, columns, 'Auxiliar por Tercero');
        this.responseObj.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        this.responseObj.header('Content-Disposition', `attachment; filename="auxiliar_tercero_${thirdPartyId}.xlsx"`);
        return this.responseObj.send(buffer);
      } else {
        const buffer = await exporter.exportToPdf(data.movements, columns, 'Auxiliar por Tercero');
        this.responseObj.header('Content-Type', 'application/pdf');
        this.responseObj.header('Content-Disposition', `attachment; filename="auxiliar_tercero_${thirdPartyId}.pdf"`);
        return this.responseObj.send(buffer);
      }
    } catch (err: any) {
      return this.responseObj.status(500).send(err.message || 'Error exportando');
    }
  }
}
