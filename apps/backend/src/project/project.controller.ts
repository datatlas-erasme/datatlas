import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from '../app/app.service';
import { Project } from './project.entity';

@Controller('project')
export class ProjectController {
    constructor(private readonly appService: AppService) { }

    @Get()
    async fetchAll(@Res() response) {
        return 'project'
    }

}
