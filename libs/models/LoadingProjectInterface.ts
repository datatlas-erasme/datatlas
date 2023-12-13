import { PublicUserInterface } from './PublicUserInterface';
import { ProjectInterface } from './ProjectInterface';

export interface LoadingProjectInterface extends Omit<ProjectInterface, 'owner' | 'contributors'> {
  owner?: PublicUserInterface;
  contributors: PublicUserInterface[];
}
