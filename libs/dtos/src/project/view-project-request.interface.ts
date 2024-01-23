import { ProjectInterface, UserInterface } from '@datatlas/models';
import { ConfigDto } from './config.dto';

export interface ViewProjectRequestInterface extends Partial<Omit<ProjectInterface, 'owner' | 'contributors'>> {
  ownerId: UserInterface['id'];
  contributorsIds: UserInterface['id'][];
  config: ConfigDto;
}
