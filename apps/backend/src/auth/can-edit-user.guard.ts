import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@datatlas/models';
import { AuthService } from './auth.service';

@Injectable()
export class CanEditUserGuard extends AuthGuard('local') {
  constructor(private readonly _reflector: Reflector, private authService: AuthService) {
    super();
  }

  /**
   * Only admins can edit users. In addition, a user can update his/her own data.
   * @param context
   */
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userCredentials = await this.authService.getLoggedUserCredentials(request);
    if (userCredentials === null) {
      return false;
    }
    return userCredentials.role === Roles.ADMIN || parseInt(request.params.id) === userCredentials.id;
  }
}
