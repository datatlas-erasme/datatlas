import { Options } from '@mikro-orm/core';

const postGresHost = process.env.POSTGRES_HOST || 'localhost';
const postGresPort = parseInt(process.env.POSTGRES_PORT) || 5432;
const postGresUser = process.env.POSTGRES_USER || 'postgres';
const postGresPassword = process.env.POSTGRES_PASSWORD || 'postgres';
const postGresDatabase = process.env.POSTGRES_DATABASE || 'postgres';

const config: Options = {
  type: 'postgresql',
  debug: true,
  port: postGresPort,
  host: postGresHost,
  user: postGresUser,
  password: postGresPassword,
  dbName: postGresDatabase,
};

export default config;
