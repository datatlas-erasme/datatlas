import {Controller, Post, Body, UseGuards, Get, Param, Put, Delete, Req, Logger} from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { ProjectDto } from '@datatlas/shared/models';
import { ProjectService } from './project.service';
import { UserService } from '../user/user.service';
import { CanModifyProjectGuard } from '../auth/canModifyProject.guard';
import { UserEntity } from '../user/entities/user.entity';
import {ValidJwtGuard} from "../auth/validJwt.guard";
import {AuthService} from "../auth/auth.service";

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService, private readonly userService: UserService, private readonly authService: AuthService) {}

  @UseGuards(CanModifyProjectGuard) // Check if the user in jwt is the same as the one sent in body.
  @Post()
  async create(@Body() projectDto: ProjectDto) {
    const owner = (projectDto.owner = await this.userService.getUserEntity(Number(projectDto.owner)));
    const contributorEntities: UserEntity[] = [];
    for (const element of Object.values(projectDto.contributors)) {
      contributorEntities.push(await this.userService.getUserEntity(element));
    }
    return this.projectService.create(projectDto, owner, contributorEntities);
  }

  /**
   * An editor can see all projects he created or where he is a contributor. An unconnected user can not see at all.
   */
  @UseGuards(ValidJwtGuard) // User must be connected.
  @Get()
  async fetchAll(@Req() req): Promise<ProjectDto[]> {
    /*
    console.log('req.headers :');
    console.log(req.headers.authorization);
    const currentUser = this.authService.getUserFromRequest(req.headers.authorization);
    console.log(currentUser);*/
    // Data from current user are needed in case of a non-admin user : only its owned and/or contributed projects will
    // be returned
    return await this.projectService.findAllAccessibleProjets(this.authService.getUserFromRequest(req.headers.authorization));
  }

  @Get(':id')
  async fetchOne(@Param('id') id: number): Promise<ProjectDto> {
    return await this.projectService.findOneById(id);
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
