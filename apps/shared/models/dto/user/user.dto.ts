import { Roles } from './Roles';

export class UserDto {
  readonly id?: number;
  readonly username?: string;
  readonly password?: string;
  readonly role?: Roles = Roles.EDITOR;
  readonly active?: boolean = true;

  constructor(userData: {
    userId?: number;
    userName?: string;
    userPassword?: string;
    userRole?: Roles;
    userIsActive?: boolean;
  }) {
    if (userData.userId) {
      this.id = userData.userId;
    }
    if (userData.userId) {
      this.username = userData.userName;
    }
    if (userData.userId) {
      this.password = userData.userPassword;
    }
    if (userData.userId) {
      this.role = userData.userRole;
    }
    if (userData.userId) {
      this.active = userData.userIsActive;
    }
  }
}
