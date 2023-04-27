import { DatasetInterface, HasOwnerIdInterface, ProjectInterface } from '@datatlas/models';
import { ConfigDto } from './config.dto';

export class CreateProjectDto
  implements Omit<Partial<ProjectInterface>, 'id' | 'owner' | 'contributors' | 'createdAt'>, HasOwnerIdInterface
{
  readonly title: string;
  draft: boolean;
  datasets: DatasetInterface[];
  description: string;
  ownerId: number;
  contributors: number[];
  config: ConfigDto;
  version? = 'v1' as const;

  constructor(createProjectDto: CreateProjectDto) {
    Object.assign(this, createProjectDto);
  }
}
