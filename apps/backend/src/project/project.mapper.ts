import { ProjectInterface } from '@datatlas/models';
import { ProjectDto } from '@datatlas/dtos';

export class ProjectMapper {
  public static toProjectDto({ owner, contributors, ...project }: ProjectInterface): ProjectDto {
    return {
      description: '',
      ...project,
      ownerId: owner?.id,
      contributorsIds: contributors.map(({ id }) => id),
    };
  }

  public static toProjectDtos(projects: ProjectInterface[]): ProjectDto[] {
    return projects.map((project) => ProjectMapper.toProjectDto(project));
  }
}
