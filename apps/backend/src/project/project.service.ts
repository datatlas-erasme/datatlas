import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find();
    }

    async findOne(id: number): Promise<Project> {
        return await this.projectRepository.findOne(id);
    }

    async create(project: Project): Promise<Project> {
        return await this.projectRepository.save(project);
    }

    async update(project: Project): Promise<Project> {
        return await this.projectRepository.save(project);
    }

    async delete(id: number): Promise<void> {
        await this.projectRepository.delete(id);
    }
        

}
