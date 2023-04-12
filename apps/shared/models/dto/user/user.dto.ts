import { Roles } from './Roles';

export class UserDto {
  id?: number;
  readonly username?: string;
  readonly role?: Roles = Roles.EDITOR;
  readonly active?: boolean = true;

  constructor(userDto: UserDto) {
    this.id = userDto.id;
    this.username = userDto.username;
    this.role = userDto.role;
    this.active = userDto.active;
  }
}
