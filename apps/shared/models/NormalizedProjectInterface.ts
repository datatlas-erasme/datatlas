import { UserInterface } from './UserInterface';
import { ProjectInterface } from './ProjectInterface';

export type NormalizedProjectInterface = Omit<ProjectInterface, 'owner'> & {
  ownerId: UserInterface['id'];
};
