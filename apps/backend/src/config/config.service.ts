import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Project } from '@datatlas/shared/models';

const postGresHost = process.env.POSTGRES_HOST || 'localhost';
const postGresPort = parseInt(process.env.POSTGRES_PORT) || 5432;
const postGresUser = process.env.POSTGRES_USER || 'postgres';
const postGresPassword = process.env.POSTGRES_PASSWORD || 'postgres';
const postGresDatabase = process.env.POSTGRES_DATABASE || 'postgres';

// convert string to int if possible
postGresPort;

@Injectable()
export class ConfigService {
  constructor(private readonly env: { [k: string]: string | undefined }) {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: postGresHost,
      port: postGresPort,
      username: postGresUser,
      password: postGresPassword,
      database: postGresDatabase,
      entities: [Project],
      synchronize: false,
      migrations: ['./migrations/*.ts'],
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
