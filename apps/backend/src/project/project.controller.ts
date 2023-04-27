import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProjectDto, Roles, UserDto } from '@datatlas/shared/models';
import { ProjectService } from './project.service';
import { UserService } from '../user/user.service';
import { CanModifyProjectGuard } from '../auth/canModifyProject.guard';
import { UserEntity } from '../user/entities/user.entity';
import { ValidJwtGuard } from '../auth/validJwt.guard';
import { AuthService } from '../auth/auth.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(CanModifyProjectGuard) // Check if the user in jwt is the same as the one sent in body.
  @Post()
  async create(@Body() projectDto: ProjectDto) {
    const owner = (projectDto.owner = await this.userService.getUserEntity(Number(projectDto.owner)));
    const contributorEntities: UserEntity[] = [];
    for (const element of Object.values(projectDto.contributors)) {
      const user = await this.userService.getUserEntity(element);
      // Check the existence of the given contributor.
      if (user) {
        contributorEntities.push(user);
      }
    }
    return await this.projectService.create(projectDto, owner, contributorEntities);
  }

  /**
   * An editor can see all projects he created or where he is a contributor. An unconnected user can not see at all.
   */
  @UseGuards(ValidJwtGuard) // todo : User no longer needs to be connected -> if not connected, returns all published projects.
  @Get()
  async fetchAll(@Req() req): Promise<ProjectDto[]> {
    // Data from current user are needed in case of a non-admin user : only its owned and/or contributed projects will
    // be returned
    return await this.projectService.findAllAccessibleProjets(
      this.authService.getUserFromRequest(req.headers.authorization)
    );
  }

  @Get(':id')
  async fetchOne(@Req() req, @Param('id') id: number): Promise<ProjectDto> {
    const requestedProject: ProjectDto = await this.projectService.findOneById(id);
    const requestingUser: UserDto = this.authService.getUserFromRequest(req.headers.authorization);
    /*
      We must check if the user can reach this.
      - Is it published ? -> Everyone can see it.
      - The requesting user is owner or contributor ? -> He can see and modify.
     */
    if (
      requestingUser.role === Roles.ADMIN ||
      requestedProject.draft === false /*|| requestingUser.id===requestedProject.owner.id*/
    ) {
      return requestedProject;
    }
    console.log('---------------------');
    console.log(requestedProject);
    console.log(requestingUser);
    console.log(requestedProject.owner);
    console.log(requestedProject.owner.id);
    return requestedProject;
  }

  //@UseGuards(CanModifyProjectGuard) // Check if the user in jwt is the same as the one sent in body.
  @Put(':id')
  async update(@Param('id') id: number, @Body() ProjectDto: ProjectDto): Promise<void> {
    return await this.projectService.update(id, ProjectDto);
  }

  // Guard : Who decides ? only owner or contributors too ?
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.projectService.delete(id);
  }
}
