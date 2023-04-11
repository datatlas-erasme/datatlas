import { Roles, UserInterface } from '@datatlas/models';

export class UpdateUserDto implements Partial<UserInterface> {
  readonly id: number;
  readonly email?: string;
  readonly name?: string;
  password?: string;
  readonly role?: Roles = Roles.EDITOR;
  readonly active?: boolean = true;

  constructor(userDto: UpdateUserDto) {
    Object.assign(this, userDto);
  }
}
