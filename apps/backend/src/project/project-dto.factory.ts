import { ProjectInterface } from '@datatlas/models';
import { ProjectDto } from '@datatlas/dtos';

export class ProjectDtoFactory {
  public static fromProject({ owner, contributors, ...project }: ProjectInterface): ProjectDto {
    return {
      description: '',
      ...project,
      ownerId: owner?.id,
      contributorsIds: contributors.map(({ id }) => id),
    };
  }

  public static fromProjects(projects: ProjectInterface[]): ProjectDto[] {
    return projects.map((project) => ProjectDtoFactory.fromProject(project));
  }
}
