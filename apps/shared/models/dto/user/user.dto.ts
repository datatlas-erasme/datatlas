export class UserDto {
  readonly username: string;
  readonly password: string;

  // admin || editor
  readonly role: string = 'editor';

  readonly active: boolean = true;

  constructor(
    private userName: string,
    private userPassword: string,
    private userRole: string = 'editor',
    private userIsActive: boolean = true
  ) {
    this.username = userName;
    this.password = userPassword;
    this.role = userRole;
    this.active = userIsActive;
  }
}
