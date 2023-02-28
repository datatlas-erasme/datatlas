export class UserDto {
  readonly username: string;
  readonly password: string;

  readonly role: Roles = Roles.EDITOR;

  readonly active: boolean = true;

  constructor(
    private userName: string,
    private userPassword: string,
    private userRole: Roles = Roles.EDITOR,
    private userIsActive: boolean = true
  ) {
    this.username = userName;
    this.password = userPassword;
    this.role = userRole;
    this.active = userIsActive;
  }
}
