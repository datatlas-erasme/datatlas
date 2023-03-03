import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectEntity } from '../entities/project.entity';
import { Project } from '@datatlas/models';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('projects')
  async fetchAll(): Promise<ProjectEntity[]> {
    return await this.projectService.findAll();
  }

  @Get('project/:id')
  async fetchOne(@Param('id') id: number): Promise<ProjectEntity> {
    return await this.projectService.findOneById(id);
  }

  @Post('project')
  async create(@Body() project: Pick<Project, 'title' | 'draft' | 'datasets' | 'description'>) {
    // I stop here because I realize that I need the current user ID to create properly the project.
    // So I MUST add first user registration and authentification.
    Logger.log(project);
    return;
    //return this.projectService.create(project);
  }

  @Delete('project/:id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.projectService.delete(id);
  }

  @Put('project/:id')
  async update(@Param('id') id: number, @Body() project: ProjectEntity): Promise<ProjectEntity> {
    return await this.projectService.update(id, project);
  }
}
