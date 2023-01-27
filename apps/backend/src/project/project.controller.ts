import { Controller, Get, Post, Put, Delete, Res, Body, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
//import { AppService } from '../app/app.service';
import { ProjectService } from './project.service';
import { Project } from '@datatlas/shared/models';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('projects')
  async fetchAll(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Post('project')
  async create(@Body() project: Project): Promise<Project> {
    return await this.projectService.create(project);
  }

  @Delete('project/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.projectService.delete(id);
  }

  @Put('project/:id')
  async update(@Param('id') id: number, @Body() project: Project): Promise<Project> {
    return await this.projectService.update(project);
  }
}
