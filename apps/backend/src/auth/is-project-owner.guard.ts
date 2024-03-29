import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { HasOwnerIdInterface } from '@datatlas/models';

@Injectable()
export class IsProjectOwnerGuard extends AuthGuard('local') {
  constructor(private readonly _reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    /*
        CHECKINGS :
        - IS JWT VALID ?
        - IS THE ID IN JWT THE SAME AS IN THE SENT OBJECT ?
     */
    const request = context.switchToHttp().getRequest<{ body: HasOwnerIdInterface; headers }>();
    const { headers } = request;
    const headerString = headers.authorization.split(' ');
    const jwtData = this.jwtService.decode(headerString[1]) as { [key: string]: never };
    // In case of incoherent jwt.
    if (jwtData === null) {
      return false;
    }
    // Jwt valid. Same ID ?
    return request.body.ownerId === jwtData.id;
  }
}
