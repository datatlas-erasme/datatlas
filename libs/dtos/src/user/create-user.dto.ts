import { Roles, UserInterface } from '@datatlas/models';

export class CreateUserDto implements Omit<Partial<UserInterface>, 'id' | 'name'> {
  readonly email: string;
  password: string;
  readonly role?: Roles = Roles.EDITOR;
  readonly active?: boolean = true;

  constructor(createUserDto: CreateUserDto) {
    Object.assign(this, createUserDto);
  }
}
