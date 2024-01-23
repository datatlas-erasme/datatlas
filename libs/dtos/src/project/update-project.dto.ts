import { DatasetInterface } from '@datatlas/models';
import { ConfigDto } from './config.dto';
import { UpdateProjectRequestInterface } from './update-project-request.interface';

export class UpdateProjectDto implements UpdateProjectRequestInterface {
  id: number;
  readonly title: string;
  draft: boolean;
  datasets: DatasetInterface[];
  description?: string;
  ownerId?: number;
  contributorsIds?: number[];
  config: ConfigDto;
  version? = 'v1' as const;

  constructor(updateProjectDto: UpdateProjectDto) {
    Object.assign(this, updateProjectDto);
  }
}
