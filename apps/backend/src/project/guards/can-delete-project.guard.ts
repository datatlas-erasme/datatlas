import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Project } from '@datatlas/models';
import { AuthService } from '../../auth/auth.service';
import { ProjectService } from '../project.service';

@Injectable()
export class CanDeleteProjectGuard extends AuthGuard('local') {
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
    const userCredentials = await this.authService.getLoggedUserCredentials(request);

    return Project.canBeDeletedBy(project, userCredentials);
  }
}
