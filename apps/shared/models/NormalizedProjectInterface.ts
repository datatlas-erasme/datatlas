import { UserInterface } from './UserInterface';
import { ProjectInterface } from './ProjectInterface';

export type NormalizedProjectInterface = Omit<ProjectInterface, 'owner' | 'contributors'> & {
  ownerId: UserInterface['id'];
  contributors: UserInterface['id'][];
};
