import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../config/mikro-orm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from '../project/project.module';
import { AuthService } from '../auth/auth.service';
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
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
