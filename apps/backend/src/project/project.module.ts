import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectEntity } from '../entities/project.entity';



@Module({
  imports: [MikroOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
