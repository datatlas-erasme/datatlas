import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '@datatlas/shared/models';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    return await this.projectRepository.findOneBy({ id });
  }

  async create(project: Project) {
    return await this.projectRepository.save(project);
  }

  async update(project: Project): Promise<Project> {
    return await this.projectRepository.save(project);
  }

  async delete(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
