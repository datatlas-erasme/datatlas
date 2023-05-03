import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@datatlas/models';
import { AuthService } from './auth.service';

@Injectable()
export class CanGetUserGuard extends AuthGuard('local') {
  constructor(private readonly _reflector: Reflector, private authService: AuthService) {
    super();
  }

  /**
   * Who can activate ?
   * - admins
   * - self (ie : if the id inside jwt is the same as requested id)
   * @param context
   */
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userCredentials = await this.authService.getLoggedUserCredentials(request);
    if (userCredentials === null) {
      return false;
    }
    console.log(userCredentials);
    console.log(request);
    return userCredentials.role === Roles.ADMIN;
  }
}
