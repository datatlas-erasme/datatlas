import { DatasetInterface, ProjectInterface } from '@datatlas/models';
import { ConfigDto } from './config.dto';

export class UpdateProjectDto implements Omit<Partial<ProjectInterface>, 'owner' | 'contributors' | 'createdAt'> {
  id: number;
  readonly title: string;
  draft: boolean;
  datasets: DatasetInterface[];
  description: string;
  ownerId?: number;
  contributors: number[];
  config: ConfigDto;
  version? = 'v1' as const;

  constructor(updateProjectDto: UpdateProjectDto) {
    Object.assign(this, updateProjectDto);
  }
}
