import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    MikroOrmModule.forFeature([UserEntity]),
    PassportModule,
  ],

  controllers: [UserController],
  providers: [AuthService, UserService],
  exports: [UserService],
})
export class UserModule {}
