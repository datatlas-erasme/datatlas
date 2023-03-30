import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
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
    const headerString = headers.authorization.split(' ');
    const jwtData = this.jwtService.decode(headerString[1]) as { [key: string]: never };
    // In case of incoherent jwt.
    if (jwtData === null) {
      return false;
    }
    // Jwt valid.
    // todo : perhaps check if user is active ?
    return true;
  }
}
