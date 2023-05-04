import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '@datatlas/models';

@Injectable()
export class AdminGuard extends AuthGuard('local') {
  constructor(private readonly _reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    /*
        CHECKING IS ADMIN ? -> USE THE JWT
     */
    // todo deport duplicated stuff about jwt data extraction (in an interface ? static method ?)
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    console.log('AdminGuard.auth', headers.authorization);
    if (!headers.authorization) {
      throw new HttpException(`Unauthorized.`, 401);
    }

    const headerString = headers.authorization.split(' ');
    const jwtData = this.jwtService.decode(headerString[1]) as { [key: string]: never };

    console.log('AdminGuard.jwtData', jwtData);
    // In case of incoherent jwt.
    if (jwtData === null) {
      return false;
    }

    // Is admin ?
    return jwtData?.role === Roles.ADMIN;
  }
}