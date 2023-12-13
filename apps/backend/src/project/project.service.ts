import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, FindOptions } from '@mikro-orm/core';
import { ProjectEntity } from './entities/project.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@datatlas/dtos';
import { Roles, UserCredentials } from '@datatlas/models';
import { ProjectDtoFactory } from './project-dto.factory';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: EntityRepository<ProjectEntity>,
    private readonly userService: UserService
  ) {}

  async createFromDto(projectDto: CreateProjectDto, userId: number): Promise<ProjectEntity> {
    const owner = await this.userService.getUser(userId);
    const contributors: UserEntity[] = await Promise.all(projectDto.contributors.map(this.userService.getUser));
    const project = this.projectRepository.create({
      ...projectDto,
      createdAt: new Date(),
      owner,
      contributors,
    });

    await this.projectRepository.persistAndFlush(project);

    return project;
  }

  async findAll(userCredentials: UserCredentials | null) {
    const findOptions: FindOptions<ProjectEntity, 'contributors'> = {
      orderBy: { createdAt: 'DESC' },
      populate: ['contributors'],
    };

    if (!userCredentials) {
      return this.projectRepository.find({ draft: false }, findOptions);
    }

    // As admin, we want all projects (including drafts).
    if (userCredentials.role === Roles.ADMIN) {
      return this.projectRepository.findAll(findOptions);
    }

    /* As non-admin user, we want all projects that are either :
        - published
        - owned by requesting user
        - tagged to current user as contributor
     */
    return this.projectRepository.find(
      {
        $or: [{ draft: false }, { owner: userCredentials.id }, { contributors: userCredentials.id }],
      },
      findOptions
    );
  }

  async getDtos(userCredentials: UserCredentials | null): Promise<ProjectDto[]> {
    const projects = await this.findAll(userCredentials);
    return ProjectDtoFactory.fromProjects(projects);
  }

  async findOneById(id: number): Promise<ProjectEntity> {
    return await this.projectRepository.findOne({ id }, { populate: ['contributors'] });
  }

  async getDto(id: number): Promise<ProjectDto> {
    const project = await this.findOneById(id);
    return ProjectDtoFactory.fromProject(project);
  }

  async update(projectDto: UpdateProjectDto, contributors: UserEntity[], owner?: UserEntity): Promise<ProjectEntity> {
    const project = this.projectRepository.upsert({
      ...projectDto,
      ...(owner ? { owner } : {}),
      ...(contributors.length > 0 ? { contributors } : {}),
    });
    await this.projectRepository.flush();
    return project;
  }

  async updateFromProjectDto(projectUpdated: UpdateProjectDto) {
    const owner: UserEntity = await this.userService.getUser(projectUpdated.ownerId);
    const contributors: UserEntity[] = await Promise.all(
      projectUpdated.contributorsIds.map(this.userService.getUser.bind(this.userService))
    );

    return await this.update(
      projectUpdated,
      contributors.filter((u) => !!u),
      owner
    );
  }

  async delete(id: number): Promise<number> {
    const projectToDelete = await this.projectRepository.findOne(id);
    await this.projectRepository.removeAndFlush(projectToDelete);
    return id;
  }
}
