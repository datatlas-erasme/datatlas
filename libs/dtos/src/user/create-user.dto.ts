import { Roles, UserInterface } from '@datatlas/models';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserDto implements Omit<Partial<UserInterface>, 'id' | 'name'> {
  @IsString()
  readonly email: string;
  @IsString()
  password: string;
  @IsString()
  @IsOptional()
  readonly role?: Roles = Roles.EDITOR;
  @IsBoolean()
  @IsOptional()
  readonly active?: boolean = true;

  constructor(createUserDto: CreateUserDto) {
    Object.assign(this, createUserDto);
  }
}
