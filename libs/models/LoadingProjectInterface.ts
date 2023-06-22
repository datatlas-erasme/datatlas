import { UserInterface } from './UserInterface';
import { ProjectInterface } from './ProjectInterface';

export interface LoadingProjectInterface extends Omit<ProjectInterface, 'owner'> {
  owner?: UserInterface;
}
