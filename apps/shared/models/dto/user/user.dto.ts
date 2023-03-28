import { Roles } from './Roles';

export class UserDto {
  id?: number;
  readonly username?: string;
  password?: string;
  readonly role?: Roles = Roles.EDITOR;
  readonly active?: boolean = true;

  constructor(userData: { id?: number; username?: string; password?: string; role?: Roles; isActive?: boolean }) {
    this.id = userData.id;
    this.username = userData.username;
    this.password = userData.password;
    this.role = userData.role;
    this.active = userData.isActive;
  }
}
