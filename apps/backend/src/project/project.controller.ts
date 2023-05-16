import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete, Req } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from '@datatlas/dtos';
import { ProjectService } from './project.service';
import { UserService } from '../user/user.service';
import { ValidJwtGuard } from '../auth/validJwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { ProjectEntity } from './entities/project.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CanEditProjectGuard } from '../auth/can-edit-project.guard';
import { AuthService } from '../auth/auth.service';

@ApiBearerAuth()
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(ValidJwtGuard)
  @Post()
  async create(@Body() projectDto: CreateProjectDto, @Req() req) {
    const userCredentials = await this.authService.getLoggedUserCredentials(req);
    const owner = await this.userService.getUser(userCredentials.id);
    const contributors: UserEntity[] = await Promise.all(projectDto.contributors.map(this.userService.getUser));

    return this.projectService.create(projectDto, owner, contributors);
  }

  // No guards ? Everyone can see all projects ?
  @Get()
  async fetchAll(): Promise<ProjectEntity[]> {
    return await this.projectService.findAll();
  }

  @Get(':id')
  async fetchOne(@Param('id') id: number): Promise<ProjectEntity> {
    return await this.projectService.findOneById(id);
  }

  @Put(':id')
  @UseGuards(CanEditProjectGuard)
  async update(@Param('id') id: number, @Body() projectUpdated: UpdateProjectDto): Promise<ProjectEntity> {
    const owner: UserEntity = await this.userService.getUser(projectUpdated.ownerId);
    const contributors: UserEntity[] = [];
    for (const contributor in projectUpdated.contributors) {
      const contributorEntity: UserEntity = await this.userService.getUser(projectUpdated.contributors[contributor]);
      contributors.push(contributorEntity);
    }
    return await this.projectService.update(projectUpdated, owner, contributors);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.projectService.delete(id);
  }
}
