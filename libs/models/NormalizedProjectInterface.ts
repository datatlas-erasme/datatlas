import { UserInterface } from './UserInterface';
import { ProjectInterface } from './ProjectInterface';

export type NormalizedProjectProperties = {
  ownerId: UserInterface['id'];
  contributorsIds: UserInterface['id'][];
};

export type NormalizedProjectInterface = Omit<ProjectInterface, 'owner' | 'contributors'> & NormalizedProjectProperties;
