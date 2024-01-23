import { ProjectInterface } from '@datatlas/models';
import { ConfigDto } from './config.dto';

export interface UpdateProjectRequestInterface
  extends Omit<Partial<ProjectInterface>, 'owner' | 'contributors' | 'createdAt'> {
  ownerId?: number;
  contributorsIds?: number[];
  config: ConfigDto;
}
