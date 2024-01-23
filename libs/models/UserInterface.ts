import { Roles } from './user';

export type UserId = number;

export interface UserInterface {
  id: UserId;
  email: string;
  password: string;
  name: string;
  role: Roles;
  active: boolean;
}
