import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }
  async findOneById(id: number): Promise<Project> {
    return this.projectRepository.findOne(id);
  }

  async update(id: number, project: Project): Promise<Project> {
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
  async create(project: Project) {
    const newProject = await this.projectRepository.create(project);
    await this.projectRepository.persistAndFlush(newProject);
    return newProject;
  }
}
