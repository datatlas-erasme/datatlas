import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ValidJwtGuard extends AuthGuard('local') {
  constructor(private readonly _reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    /*
        CHECKING IS JWT VALID ? -> authorize
     */
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    console.log('ValidJwtGuard', headers.authorization);
    if (!headers.authorization) {
      throw new HttpException(`Unauthorized.`, 401);
    }

    const headerString = headers.authorization.split(' ');
    const jwtData = this.jwtService.decode(headerString[1]) as { [key: string]: never };
    console.log('jwtData', jwtData);
    // In case of incoherent jwt.
    if (jwtData === null) {
      return false;
    }
    // Jwt valid.
    // todo : perhaps check if user is active ?
    return true;
  }
}
