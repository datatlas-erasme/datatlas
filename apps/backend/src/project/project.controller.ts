import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from '@datatlas/dtos';
import { ProjectService } from './project.service';
import { UserService } from '../user/user.service';
import { IsProjectOwnerGuard } from '../auth/is-project-owner.guard';
import { ValidJwtGuard } from '../auth/validJwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { ProjectEntity } from './entities/project.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService, private readonly userService: UserService) {}

  @UseGuards(ValidJwtGuard, IsProjectOwnerGuard) // Check if the user in jwt is the same as the one sent in body.
  @Post()
  async create(@Body() projectDto: CreateProjectDto) {
    console.log('create controller');
    const owner = await this.userService.getUser(Number(projectDto.ownerId));
    console.log('owner', owner);
    const contributors: UserEntity[] = [];
    for (const element of Object.values(projectDto.contributors)) {
      contributors.push(await this.userService.getUser(element));
    }

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
  async update(@Param('id') id: number, @Body() projectUpdates: UpdateProjectDto): Promise<ProjectEntity> {
    return await this.projectService.update(id, projectUpdates);
  }

  // Guard : Who decides ? only owner or contributors too ?
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.projectService.delete(id);
  }
}
