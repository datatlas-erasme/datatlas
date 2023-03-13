import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, Logger} from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    Logger.log('contructeur de jwt 1');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    Logger.log('contructeur de jwt 2');
  }

  async validate(payload: any) {
    Logger.log('validate de jwt');
    //Logger.log(payload);

    return { password: payload.sub, username: payload.username };
  }
}
