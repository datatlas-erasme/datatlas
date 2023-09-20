import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@datatlas/models';
import { AuthService } from '../../auth/auth.service';
import { ProjectService } from '../project.service';

@Injectable()
export class CanSeeProjectGuard extends AuthGuard('local') {
  constructor(
    private readonly _reflector: Reflector,
    private authService: AuthService,
    private readonly projectService: ProjectService
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const project = await this.projectService.findOneById(parseInt(request.params.id));

    if (project.draft) {
      const userCredentials = await this.authService.getLoggedUserCredentials(request);
      if (!userCredentials || (userCredentials.id !== project.owner.id && userCredentials.role !== Roles.ADMIN)) {
        return false;
      }
    }

    return true;
  }
}
