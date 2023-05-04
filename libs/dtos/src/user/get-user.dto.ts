import { Roles, UserInterface } from '@datatlas/models';

export class GetUserDto implements Omit<Partial<UserInterface>, 'password'> {
  readonly id: number;
  readonly email: string;
  readonly name?: string;
  readonly role: Roles = Roles.EDITOR;
  readonly active: boolean = true;

  constructor(getUserDto: GetUserDto) {
    Object.assign(this, getUserDto);
  }
}
