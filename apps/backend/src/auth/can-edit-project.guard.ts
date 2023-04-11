import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserCredentials } from '@datatlas/models';
import { AuthService } from './auth.service';
import { ProjectService } from '../project/project.service';

@Injectable()
export class CanEditProjectGuard extends AuthGuard('local') {
  constructor(
    private readonly _reflector: Reflector,
    private authService: AuthService,
    private readonly projectService: ProjectService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userCredentials = await this.authService.getLoggedUserCredentials(request);

    if (userCredentials === null) {
      return false;
    }

    const projectToUpdate = await this.projectService.findOneById(request);

    if (!UserCredentials.canEditProject(userCredentials, projectToUpdate)) {
      throw new UnauthorizedException('Insufficient rights to edit this project.');
    }

    return true;
  }
}
