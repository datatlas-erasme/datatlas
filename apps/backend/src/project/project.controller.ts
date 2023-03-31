import {Controller, Post, Body, Logger, UseGuards, Get} from '@nestjs/common';
import { ProjectDto } from '@datatlas/shared/models';
import { ProjectService } from './project.service';
import { UserService } from '../user/user.service';
import { CanModifyProjectGuard } from '../auth/canModifyProject.guard';
import {UserEntity} from "../user/entities/user.entity";

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService, private readonly userService: UserService) {}

  @UseGuards(CanModifyProjectGuard) // Check if the user in jwt is the same as the one sent in body.
  @Post()
  async create(@Body() projectDto: ProjectDto) {
    const owner = projectDto.owner = await this.userService.getUserEntity(Number(projectDto.owner));
    const contributorEntities: UserEntity[] = [];
    for (const element of Object.values(projectDto.contributors)) {
      contributorEntities.push(await this.userService.getUserEntity(element));
    }
    return this.projectService.create(projectDto, owner, contributorEntities)
  }

  // No guards ? Everyone can see all projects ?
  @Get()
  async fetchAll(): Promise<ProjectDto[]> {
    return await this.projectService.findAll();
  }

  /*

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
