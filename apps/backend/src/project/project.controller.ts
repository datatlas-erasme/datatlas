import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete, Req, NotFoundException } from '@nestjs/common';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@datatlas/dtos';
import { UserCredentials } from '@datatlas/models';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidJwtGuard } from '../auth/validJwt.guard';
import { AuthService } from '../auth/auth.service';
import { CanDeleteProjectGuard, CanEditProjectGuard, CanViewProjectGuard } from './guards';
import { ProjectEntity } from './entities/project.entity';
import { ProjectService } from './project.service';

@ApiBearerAuth()
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService, private readonly authService: AuthService) {}

  @Post()
  @UseGuards(ValidJwtGuard)
  async create(@Body() projectDto: CreateProjectDto, @Req() req) {
    const userCredentials = await this.authService.getLoggedUserCredentials(req);
    return this.projectService.createFromDto(projectDto, userCredentials.id);
  }

  @Get()
  async fetchAll(@Req() req): Promise<ProjectDto[]> {
    const userCredentials: UserCredentials = await this.authService.getLoggedUserCredentials(req);
    return this.projectService.getDtos(userCredentials);
  }

  @Get(':id')
  @UseGuards(CanViewProjectGuard)
  async fetchOne(@Param('id') id: number): Promise<ProjectDto> {
    const projectDto = await this.projectService.getDto(id);
    if (projectDto === null) {
      throw new NotFoundException('Project not found');
    }
    return projectDto;
  }

  @Put(':id')
  @UseGuards(CanEditProjectGuard)
  async update(@Param('id') id: number, @Body() projectUpdated: UpdateProjectDto): Promise<ProjectDto> {
    return this.projectService.updateFromProjectDto(projectUpdated);
  }

  @Delete(':id')
  @UseGuards(CanDeleteProjectGuard)
  async delete(@Param('id') id: number): Promise<number> {
    return await this.projectService.delete(id);
  }
}
