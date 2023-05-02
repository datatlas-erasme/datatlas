import {AuthGuard} from '@nestjs/passport';
import {ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Roles} from '@datatlas/models';
import {AuthService} from './auth.service';
import {UserService} from "../user/user.service";

@Injectable()
export class CanCreateUserGuard extends AuthGuard('local') {
  constructor(
    private readonly _reflector: Reflector,
    private authService: AuthService,
    private readonly userService: UserService
  ) {
    super();
  }

  /**
   * Only admins can create new users.
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
