import { Controller, Get, Post, Put, Delete, Res, Body } from '@nestjs/common';
import { Repository } from 'typeorm';
//import { AppService } from '../app/app.service';
import { ProjectService } from './project.service';
import { Project} from './project.entity';


@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get()
    async fetchAll(): Promise<Project[]> {
        return await this.projectService.findAll();
    }

    @Post()
    async create(@Body() project: Project): Promise<Project> {
        return await this.projectService.create(project);
    }


}
