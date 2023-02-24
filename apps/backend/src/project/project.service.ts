import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { ProjectEntity } from './entities/project.entity';
import { ProjectDto } from '@datatlas/shared/models';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: EntityRepository<ProjectEntity>
  ) {}

  async findAll(): Promise<ProjectDto[]> {
    return this.projectRepository.findAll();
  }
  async findOneById(id: number): Promise<ProjectDto> {
    return this.projectRepository.findOne({ id });
  }

  async update(id: number, projectDto: ProjectDto): Promise<ProjectDto> {
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

  async create(projectDto: ProjectDto): Promise<ProjectDto> {
    const project = new ProjectEntity(
      projectDto.title,
      projectDto.description,
      projectDto.draft,
      projectDto.datasets,
      projectDto.owner,
      projectDto.contributors,
      projectDto.config,
      projectDto.version
    );
    await this.projectRepository.persistAndFlush(project);
    return project;
  }
}
