import { DatasetInterface, ProjectInterface, UserInterface } from '@datatlas/models';
import { ConfigDto } from './config.dto';

export class ProjectDto implements Partial<ProjectInterface> {
  id: number;
  readonly title: string;
  createdAt: Date;
  draft: boolean;
  datasets: DatasetInterface[];
  description: string;
  owner: UserInterface;
  contributors: UserInterface[];
  config: ConfigDto;
  version = 'v1' as const;

  constructor(project: ProjectDto) {
    Object.assign(this, project);
  }
}
