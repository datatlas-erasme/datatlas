import { UserInterface } from './UserInterface';

export interface PublicUserInterface extends Omit<UserInterface, 'password' | 'name'> {
  password?: string;
  name?: string;
}
