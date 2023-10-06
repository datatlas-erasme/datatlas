/* eslint-disable @typescript-eslint/no-empty-interface */
import { Roles } from '../user';
import { UserInterface } from '../UserInterface';
import { UserCredentialsInterface } from './UserCredentialsInterface';

export class UserCredentials implements UserCredentialsInterface {
  active: boolean;
  email: string;
  id: number;
  role: Roles;

  constructor(userCredentials: UserCredentialsInterface) {
    this.active = userCredentials.active;
    this.email = userCredentials.email;
    this.id = userCredentials.id;
    this.role = userCredentials.role;
  }

  static isActive(partialUser?: Pick<UserInterface, 'active'>) {
    return partialUser && partialUser?.active;
  }

  static isAdmin(userCredentials?: UserCredentialsInterface) {
    return userCredentials && userCredentials?.role === Roles.ADMIN;
  }
}
