import { Roles } from './Roles';

export class UserDto {
  id?: number;
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
    if (userData.userName) {
      this.username = userData.userName;
    }
    if (userData.userPassword) {
      this.password = userData.userPassword;
    }
    if (userData.userRole && userData.userRole in Roles) {
      this.role = userData.userRole;
    } else {
      this.role = Roles.EDITOR;
    }
    if (userData.userIsActive) {
      this.active = userData.userIsActive;
    }
  }
}
