import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { ProjectEntity } from './entities/project.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateProjectDto, UpdateProjectDto } from '@datatlas/dtos';
import { Roles, UserCredentials } from '@datatlas/models';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: EntityRepository<ProjectEntity>
  ) {}

  async create(projectDto: CreateProjectDto, owner: UserEntity, contributors: UserEntity[]): Promise<ProjectEntity> {
    const project = this.projectRepository.create({
      ...projectDto,
      createdAt: new Date(),
      owner,
      contributors,
    });

    await this.projectRepository.persistAndFlush(project);

    return project;
  }

  async findAll(userCredentials: UserCredentials): Promise<ProjectEntity[]> {
    // As admin, we want all projects (including drafts).
    if (userCredentials.role === Roles.ADMIN) {
      return this.projectRepository.findAll();
    }

    /* As non-admin user, we want all projects that are either :
        - published
        - owned by requesting user
        - tagged to current user as contributor
     */
    const res = await this.projectRepository.find({
      $or: [{ draft: false }, { owner: userCredentials.id }, { contributors: userCredentials.id }],
    });
    return res;
  }

  async findOneById(id: number): Promise<ProjectEntity> {
    return await this.projectRepository.findOne({ id });
  }

  async update(projectDto: UpdateProjectDto, owner: UserEntity, contributors: UserEntity[]): Promise<ProjectEntity> {
    const project = this.projectRepository.upsert({
      ...projectDto,
      owner,
      contributors,
    });
    await this.projectRepository.flush();
    return project;
  }

  async delete(id: number): Promise<number> {
    const projectToDelete = await this.projectRepository.findOne(id);
    await this.projectRepository.removeAndFlush(projectToDelete);
    return id;
  }
}
