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
    return this.projectRepository.findOne({ id });
  }

  async update(id: number, projectDto: UpdateProjectDto): Promise<ProjectEntity> {
    const projectToUpdate = await this.projectRepository.findOne(id);
    this.projectRepository.assign(projectToUpdate, projectDto);
    await this.projectRepository.persistAndFlush(projectToUpdate);

    return projectToUpdate;
  }

  async delete(id: number): Promise<number> {
    const projectToDelete = await this.projectRepository.findOne(id);
    await this.projectRepository.removeAndFlush(projectToDelete);
    return id;
  }
}
