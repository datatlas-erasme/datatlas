import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, FindOptions } from '@mikro-orm/core';
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

  async findAll(userCredentials: UserCredentials | null): Promise<ProjectEntity[]> {
    const findOptions: FindOptions<ProjectEntity> = { orderBy: { createdAt: 'DESC' } };

    if (!userCredentials) {
      return await this.projectRepository.find({ draft: false }, findOptions);
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
    const res = await this.projectRepository.find(
      {
        $or: [{ draft: false }, { owner: userCredentials.id }, { contributors: userCredentials.id }],
      },
      findOptions
    );
    return res;
  }

  async findOneById(id: number): Promise<ProjectEntity> {
    return await this.projectRepository.findOne({ id });
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

  async delete(id: number): Promise<number> {
    const projectToDelete = await this.projectRepository.findOne(id);
    await this.projectRepository.removeAndFlush(projectToDelete);
    return id;
  }
}
