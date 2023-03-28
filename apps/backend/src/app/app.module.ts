import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PassportModule } from '@nestjs/passport';
import config from '../config/mikro-orm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from '../project/project.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from '../auth/local.strategy';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...config,
      autoLoadEntities: true,
    }),
    PassportModule,
    ProjectModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, LocalStrategy, JwtService],
})
export class AppModule {}
