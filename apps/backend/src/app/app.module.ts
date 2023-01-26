import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from '../config/config.service';
import { ProjectModule } from '../project/project.module';


@Module({
  imports: [
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      ProjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
