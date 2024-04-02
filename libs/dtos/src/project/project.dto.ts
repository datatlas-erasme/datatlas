import { DatasetInterface, ProjectInterface, UserInterface } from '@datatlas/models';
import { ConfigDto } from './config.dto';

export class ProjectDto implements Partial<Omit<ProjectInterface, 'owner' | 'contributors'>> {
  id: number;
  readonly title: string;
  createdAt: Date;
  draft: boolean;
  datasets: DatasetInterface[];
  description: string;
  /**
   * @deprecated use `ownerId` instead
   */
  owner?: UserInterface['id'];
  ownerId: UserInterface['id'];
  contributorsIds: UserInterface['id'][];
  config: ConfigDto;
  version = 'v1' as const;

  constructor(projectDto: ProjectDto) {
    Object.assign(this, projectDto);
  }
}
