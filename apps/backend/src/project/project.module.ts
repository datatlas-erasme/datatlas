import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectEntity } from './entities/project.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '600s' },
  }),
    MikroOrmModule.forFeature([ProjectEntity, UserEntity]),
    PassportModule,
  ],
  providers: [ProjectService, UserService],
  controllers: [ProjectController],
})
export class ProjectModule {}
