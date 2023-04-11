import { Roles } from './user';

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Roles;
  active: boolean;
}
