import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  post,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {
  CreateJournalTransactionDto,
  CreateJournalTransactionUseCase,
} from '../../../application/accounting/use-cases/create-journal-transaction.use-case';
import {LedgerEntry} from '../../../domain/accounting/entities/ledger-entry.entity';
import {AccountRepository} from '../../../infrastructure/accounting/repositories/account.repository';
import {LedgerEntryRepository} from '../../../infrastructure/accounting/repositories/ledger-entry.repository';
import {AccountingPeriodRepository} from '../../../infrastructure/accounting/repositories/accounting-period.repository';
import {PostgresDataSource} from '../../../infrastructure/database/datasources/postgres.datasource';
import {ApiResponse} from '../../../shared/responses/api.response';

export class JournalTransactionController {
  constructor(
    @repository(AccountRepository)
    private accountRepository: AccountRepository,

    @repository(LedgerEntryRepository)
    private ledgerEntryRepository: LedgerEntryRepository,

    @repository(AccountingPeriodRepository)
    private accountingPeriodRepository: AccountingPeriodRepository,

    @inject('datasources.postgres')
    private dataSource: PostgresDataSource,

    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,

    @inject('currentCompanyId')
    private currentCompanyId: string,
  ) {}

  // POST /journal-transactions — Registrar transacción de diario manual balanceada
  @post('/journal-transactions', {
    responses: {
      '201': {
        description: 'Asiento de diario contable registrado exitosamente',
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
      },
    },
  })
  async create(
    @requestBody({
      description: 'Datos del asiento de diario completo a registrar',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['concept', 'reference', 'lines'],
            properties: {
              concept: {type: 'string'},
              reference: {type: 'string'},
              date: {type: 'string'},
              lines: {
                type: 'array',
                minItems: 2,
                items: {
                  type: 'object',
                  required: ['accountId', 'debit', 'credit'],
                  properties: {
                    accountId: {type: 'string'},
                    debit: {type: 'number', minimum: 0},
                    credit: {type: 'number', minimum: 0},
                    description: {type: 'string'},
                    thirdPartyId: {type: 'string'},
                  },
                },
              },
            },
          },
        },
      },
    })
    dto: CreateJournalTransactionDto,
  ): Promise<ApiResponse<LedgerEntry[]>> {
    dto.companyId = this.currentCompanyId;

    const useCase = new CreateJournalTransactionUseCase(
      this.accountRepository,
      this.ledgerEntryRepository,
      this.accountingPeriodRepository,
      this.dataSource,
    );

    try {
      this.responseObj.status(201);
      const entries = await useCase.execute(dto);
      return ApiResponse.success(
        entries,
        'Asiento de diario contable registrado exitosamente',
      );
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
