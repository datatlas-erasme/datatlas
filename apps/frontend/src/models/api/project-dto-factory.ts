import type { ProjectDto } from '@datatlas/dtos';

export class ProjectDtoFactory {
  static fromJson(projectDto: ProjectDto) {
    return {
      ...projectDto,
      createdAt: projectDto.createdAt ? new Date(projectDto.createdAt) : new Date(),
    };
  }
}
