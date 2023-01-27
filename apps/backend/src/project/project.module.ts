import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectSchema} from './project.schema';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';



@Module({
  imports: [TypeOrmModule.forFeature([ProjectSchema])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
