import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SelfOrAdminGuard extends AuthGuard('local') {
  constructor(private readonly _reflector: Reflector, private jwtService: JwtService) {
    Logger.log('dans le constr de la garde');
    super();
  }

  canActivate(context: ExecutionContext) {
    Logger.log('dans validate de la garde');
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const headerString = headers.authorization.split(' ');

    console.log('header token :');
    console.log(headerString[1]);
    console.log('secret :');
    console.log(jwtConstants.secret);

    const datum = this.jwtService.decode(headerString[1]);
    console.log('données du token :');
    console.log(datum);

    //const decodedJwtAccessToken = this.jwtService.decode(signedJwtAccessToken);

    return true;
  }

  /*
  canActivate(context: ExecutionContext): boolean {
    Logger.log('je suis dans la garde');
    console.log(context);
    const passportActive = super.canActivate(context);
    if (!passportActive) {
      throw new HttpException(
        'You do not have permission (Roles)',
        HttpStatus.UNAUTHORIZED,
      );
    }
    Logger.log(passportActive);
    console.log(passportActive);
    return true;
  }*/
}
