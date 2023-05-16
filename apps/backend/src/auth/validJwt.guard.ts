import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';

@Injectable()
export class ValidJwtGuard extends AuthGuard('local') {
  constructor(private readonly _reflector: Reflector, private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const jwtData = await this.authService.getLoggedUserCredentials(context.switchToHttp().getRequest());
    return jwtData !== null;
  }
}
