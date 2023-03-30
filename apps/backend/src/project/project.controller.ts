import {Controller, Post, Body, Logger, UseGuards} from '@nestjs/common';
import { ProjectDto } from '@datatlas/shared/models';
import { ProjectService } from './project.service';
import { UserService } from '../user/user.service';
import {CanModifyProjectGuard} from "../auth/canModifyProject.guard";

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService, private readonly userService: UserService) {}

  @UseGuards(CanModifyProjectGuard) // Check if the user in jwt is the same as the one sent in body.
  @Post('project')
  async create(@Body() ProjectDto: ProjectDto) {

    // Let's test with a random existing users.
    const owner = await this.userService.getUserEntity(63);
    const contrib1 = await this.userService.getUserEntity(63);
    const contrib2 = await this.userService.getUserEntity(64);
    const contribs = [contrib1, contrib2];
    return this.projectService.create(ProjectDto, owner, contribs);
  }

  /*
  @Get('projects')
  async fetchAll(): Promise<ProjectDto[]> {
    return await this.projectService.findAll();
  }

  @Get('project/:id')
  async fetchOne(@Param('id') id: number): Promise<ProjectDto> {
    return await this.projectService.findOneById(id);
  }

  @Post('project')
  async create(@Body() ProjectDto: ProjectDto) {
    Logger.log(ProjectDto);
    return this.projectService.create(ProjectDto);
  }

  @Delete('project/:id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.projectService.delete(id);
  }

  @Put('project/:id')
  async update(@Param('id') id: number, @Body() ProjectDto: ProjectDto): Promise<ProjectDto> {
    return await this.projectService.update(id, ProjectDto);
  }

   */
}
