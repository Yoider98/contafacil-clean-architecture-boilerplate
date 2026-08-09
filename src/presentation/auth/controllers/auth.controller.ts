import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import {LoginUseCase} from '../../../application/auth/use.cases/login.use-case';

export class AuthController {
  constructor(
    @inject('usecases.LoginUseCase')
    private loginUseCase: LoginUseCase,
  ) {}

  @post('/auth/login', {
    responses: {
      '200': {
        description: 'Login successful',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  type: 'object',
                  properties: {
                    token: {type: 'string'},
                    user: {
                      type: 'object',
                      properties: {
                        id: {type: 'string'},
                        email: {type: 'string'},
                        name: {type: 'string'},
                        role: {type: 'string'},
                      },
                    },
                    activeCompany: {type: 'object'},
                    associatedCompanies: {
                      type: 'array',
                      items: {type: 'object'}
                    },
                    permissions: {
                      type: 'array',
                      items: {type: 'string'}
                    }
                  },
                },
                success: {type: 'boolean'},
                message: {type: 'string'},
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: {
      email: string;
      password: string;
    },
  ): Promise<{
    data: {
      token: string | null;
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
      activeCompany?: any;
      associatedCompanies?: any[];
      permissions?: string[];
    } | null;
    success: boolean;
    message: string;
  }> {
    return this.loginUseCase.execute(credentials.email, credentials.password);
  }
}
