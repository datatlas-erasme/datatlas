import type { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const postGresHost = process.env.POSTGRES_HOST || 'localhost';
const postGresPort = parseInt(process.env.POSTGRES_PORT) || 5432;
const postGresUser = process.env.POSTGRES_USER || 'postgres';
const postGresPassword = process.env.POSTGRES_PASSWORD || 'postgres';
const postGresDatabase = process.env.POSTGRES_DATABASE || 'postgres';

export const createConfig = (): Options<PostgreSqlDriver> => ({
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production',
  port: postGresPort,
  host: postGresHost,
  user: postGresUser,
  password: postGresPassword,
  dbName: postGresDatabase,
  entities: [`${__dirname}/../**/entities/*`],
  migrations: {
    path: `${__dirname}/../migrations`,
  },
});

const config = createConfig();

export default config;
