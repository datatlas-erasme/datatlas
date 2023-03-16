import { Roles } from './Roles';

export class UserDto {
  readonly id: number;
  readonly username: string;
  readonly password: string;

  readonly role: Roles = Roles.EDITOR;

  readonly active: boolean = true;

  constructor(
    private userId: number,
    private userName: string,
    private userPassword: string,
    private userRole: Roles = Roles.EDITOR,
    private userIsActive: boolean = true
  ) {
    this.id = userId;
    this.username = userName;
    this.password = userPassword;
    this.role = userRole;
    this.active = userIsActive;
  }
}
