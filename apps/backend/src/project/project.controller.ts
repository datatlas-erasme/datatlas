import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from '@datatlas/shared/models';
import { UserService } from '../user/user.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService, private readonly userService: UserService) {}

  @Post('project')
  async create(@Body() ProjectDto: ProjectDto) {
    // Let's test with a random existing user.
    const owner = await this.userService.getUserEntity(63);
    return this.projectService.create(ProjectDto, owner);
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
