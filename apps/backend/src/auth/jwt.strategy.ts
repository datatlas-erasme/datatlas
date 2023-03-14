import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserDto } from '@datatlas/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: UserDto) {
    //Logger.log(payload);
    // todo rework entirely and put these data inside : id, username, role.
    // id and role have be retrieve from db using username.
    return { role: payload.role, username: payload.username };
  }
}
