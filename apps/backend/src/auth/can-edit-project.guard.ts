import { AuthGuard } from '@nestjs/passport';
import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
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

    // Requesting user must be logged.
    if (userCredentials === null) {
      return false;
    }
    // Id received in GET params must be the same as the id received in body
    if (parseInt(request.params.id) !== parseInt(request.body.id)) {
      throw new BadRequestException('Id project sent in parameter is different to id project sent in body.', {
        cause: new Error(),
        description: 'Some error description',
      });
    }

    const projectToUpdate = await this.projectService.findOneById(parseInt(request.params.id));

    if (!UserCredentials.canEditProject(userCredentials, projectToUpdate)) {
      throw new UnauthorizedException('Insufficient rights to edit this project.');
    }

    return true;
  }
}
