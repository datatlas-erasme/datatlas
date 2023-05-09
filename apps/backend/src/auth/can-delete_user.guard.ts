import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@datatlas/models';
import { AuthService } from './auth.service';

@Injectable()
export class CanDeleteUserGuard extends AuthGuard('local') {
  constructor(private readonly _reflector: Reflector, private authService: AuthService) {
    super();
  }

  /**
   * Who can activate ?
   * - admins (restriction on self ? -> to think about)
   * - self for editors ? -> editors can not delete themselves but they can modify their active status to "false".
   * @param context
   */
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userCredentials = await this.authService.getLoggedUserCredentials(request);
    if (userCredentials === null) {
      return false;
    }
    return userCredentials.role === Roles.ADMIN;
  }
}
