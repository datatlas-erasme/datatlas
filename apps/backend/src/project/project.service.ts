import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: EntityRepository<ProjectEntity>
  ) {}

  async findAll(): Promise<ProjectEntity[]> {
    return this.projectRepository.findAll();
  }
  async findOneById(id: number): Promise<ProjectEntity> {
    return this.projectRepository.findOne(id);
  }

  async update(id: number, project: ProjectEntity): Promise<ProjectEntity> {
    const projectToUpdate = await this.projectRepository.findOne(id);
    this.projectRepository.assign(projectToUpdate, project);
    await this.projectRepository.persistAndFlush(projectToUpdate);
    return projectToUpdate;
  }

  async delete(id: number): Promise<boolean> {
    const projectToDelete = await this.projectRepository.findOne(id);
    await this.projectRepository.removeAndFlush(projectToDelete);
    return true;
  }

  // Return id of new project <Promoise<number>>
  async create(project: ProjectEntity) {
    const newProject = await this.projectRepository.create(project);
    await this.projectRepository.persistAndFlush(newProject);
    return newProject;
  }
}
