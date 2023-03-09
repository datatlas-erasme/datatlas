import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    Logger.log('utilisateur : ' + username);
    Logger.log('mdp : ' + password);
    const user = await this.authService.validateUser(username, password);
    Logger.log(user);
    if (!user) {
      Logger.log('user unknown');
      throw new UnauthorizedException();
    }
    Logger.log('user fount');
    return user;
  }
}
