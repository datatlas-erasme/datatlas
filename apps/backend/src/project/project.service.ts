import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { ProjectEntity } from './entities/project.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateProjectDto, UpdateProjectDto } from '@datatlas/dtos';

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

  async findAll(): Promise<ProjectEntity[]> {
    return this.projectRepository.findAll();
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
