import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectEntity } from './entities/project.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ProjectEntity, UserEntity])],
  providers: [ProjectService, UserService],
  controllers: [ProjectController],
})
export class ProjectModule {}
