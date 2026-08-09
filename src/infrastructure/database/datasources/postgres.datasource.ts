import {juggler} from '@loopback/repository';
import * as dotenv from 'dotenv';

dotenv.config();

const config =
  process.env.NODE_ENV === 'test'
    ? {
        name: 'postgres',
        connector: 'memory',
      }
    : {
        name: 'postgres',
        connector: 'postgresql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
          rejectUnauthorized: false,
        },
        connectionTimeoutMillis: 10000,
      };

export class PostgresDataSource extends juggler.DataSource {
  static dataSourceName = 'postgres';
  static readonly defaultConfig = config;

  constructor(dsConfig: object = config)  { super(); /* Inyectado por constructor */ }
}
