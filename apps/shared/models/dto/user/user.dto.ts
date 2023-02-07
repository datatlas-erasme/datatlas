export class UserDto {
  readonly username: string;
  readonly password: string;

  // admin || editor
  readonly role: string = 'editor';

  readonly active: boolean = true;

  constructor(
    private user_name: string,
    private user_password: string,
    private user_role: string = 'editor',
    private user_is_active: boolean = true
  ) {
    this.username = user_name;
    this.password = user_password;
    this.role = user_role;
    this.active = user_is_active;
  }
}
