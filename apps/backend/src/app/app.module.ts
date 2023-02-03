import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { configService } from '../config/config.service';
import { ProjectModule } from '../project/project.module';
import config from '../config/mikro-orm';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...config,
      autoLoadEntities: true,
    }),
    ProjectModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService, JwtService, UserService],
})
export class AppModule {}
