import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@mikro-orm/nestjs';
import {EntityRepository} from '@mikro-orm/core';
import {ProjectEntity} from './entities/project.entity';
import {ProjectDto, Roles, UserDto} from '@datatlas/shared/models';
import {UserEntity} from '../user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: EntityRepository<ProjectEntity>
  ) {}

  async create(projectDto: ProjectDto, owner: UserEntity, contributors: UserEntity[]): Promise<ProjectEntity> {
    const project = new ProjectEntity(
      projectDto.title,
      new Date(),
      projectDto.draft,
      projectDto.datasets,
      projectDto.description,
      owner,
      contributors,
      projectDto.config,
      projectDto.version
    );
    await this.projectRepository.persistAndFlush(project);
    return project;
  }

  async findAllAccessibleProjets(currentUser: Omit<UserDto, 'password'>): Promise<ProjectDto[]> {
    // An admin user can see all projects
    if (currentUser.role==Roles.ADMIN){
      return await this.findAll();
    }
    // Other users can only see their own projects where they are owners or contributors.
    return await this.findProjectsOfUser(currentUser);
  }

  async findProjectsOfUser(user :Omit<UserDto, 'password'>): Promise<ProjectDto[]>{
    console.log(user);
    //const res = await this.projectRepository.find( { owner: { $eq: user.id }  });
    /*
    const res = await this.projectRepository.find( { $or: [
        {
          owner: { $eq: user.id }, // All projects owned by current user.
           // All project where current user is a contributor.
        },
      ] });*/

    const res = await this.projectRepository.find({ $or: [{ id: { $eq: user.id } }] }, { populate: ['role', 'role.permissions'] })


    //const res = await this.projectRepository.find( { $or: [{ id: { $eq: user.id } }, { contributors: { $contains: user.id } }] });

    /*
    const res = await this.projectRepository.find( { $or: [
        {
          owner: { $eq: user.id }, // All projects owned by current user.
          contributors:{$contains: user.id}, // All project where current user is a contributor.
        },
      ] });*/
    console.log(res);
    return res;
  }

  async findAll(): Promise<ProjectDto[]> {
    return this.projectRepository.findAll();
  }

  async findOneById(id: number): Promise<ProjectDto> {
    return this.projectRepository.findOne({ id });
  }

  async update(id: number, projectDto: ProjectDto): Promise<void> {
    const projectToUpdate = await this.projectRepository.findOne(id);
    this.projectRepository.assign(projectToUpdate, projectDto);
    return await this.projectRepository.persistAndFlush(projectToUpdate);
  }

  async delete(id: number): Promise<number> {
    const projectToDelete = await this.projectRepository.findOne(id);
    await this.projectRepository.removeAndFlush(projectToDelete);
    return id;
  }
}
