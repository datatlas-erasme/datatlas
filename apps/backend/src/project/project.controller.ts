import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  Req,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from '@datatlas/dtos';
import { ProjectService } from './project.service';
import { UserService } from '../user/user.service';
import { ValidJwtGuard } from '../auth/validJwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { ProjectEntity } from './entities/project.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CanEditProjectGuard } from '../auth/can-edit-project.guard';
import { AuthService } from '../auth/auth.service';
import { UserCredentials } from '@datatlas/models';

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

  @Get()
  /**
   * This function should return only published and/or owned projects.
   */
  async fetchAll(@Req() req): Promise<ProjectEntity[]> {
    const userCredentials: UserCredentials = await this.authService.getLoggedUserCredentials(req);
    return await this.projectService.findAll(userCredentials);
  }

  @Get(':id')
  async fetchOne(@Param('id') id: number): Promise<ProjectEntity> {
    const project = await this.projectService.findOneById(id);
    if (project === null) {
      throw new NotFoundException('Project not found');
    }
    return project;
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
    return await this.projectService.update(
      projectUpdated,
      contributors.filter((u) => !!u),
      owner
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.projectService.delete(id);
  }
}
