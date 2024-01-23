import { UserInterface } from './UserInterface';

export interface ProjectCredentials {
  owner: UserInterface;
  contributors: UserInterface[];
}
