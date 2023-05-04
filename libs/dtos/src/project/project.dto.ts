import { DatasetInterface, ProjectInterface, UserInterface } from '@datatlas/models';
import { ConfigDto } from './config.dto';

export class ProjectDto implements Partial<Omit<ProjectInterface, 'owner'>> {
  id: number;
  readonly title: string;
  createdAt: Date;
  draft: boolean;
  datasets: DatasetInterface[];
  description: string;
  // Let's talk about what's the type of this because something is feeling wrong here.
  owner: number;
  contributors: UserInterface[];
  config: ConfigDto;
  version = 'v1' as const;

  constructor(project: ProjectDto) {
    Object.assign(this, project);
  }
}
