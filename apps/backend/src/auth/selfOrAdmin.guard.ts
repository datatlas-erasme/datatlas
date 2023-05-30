import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '@datatlas/models';

@Injectable()
export class SelfOrAdminGuard extends AuthGuard('local') {
  constructor(private readonly _reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    /*
        CHECKING IS ADMIN ? -> USE THE JWT
        CHECKING THE SELF ? -> USE THE PARAMS.ID (MUST ALWAYS BE ID)
     */
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    if (!headers.authorization) {
      throw new HttpException(`Unauthorized.`, 401);
    }

    const headerString = headers.authorization.split(' ');
    const jwtData = this.jwtService.decode(headerString[1]) as { [key: string]: never };
    // In case of incoherent jwt.
    if (jwtData === null) {
      return false;
    }
    // Is admin ?
    if (jwtData?.role === Roles.ADMIN) {
      return true;
    }
    // Is self ?
    return jwtData.id == request.params.id;
  }
}
