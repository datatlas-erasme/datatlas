import { Roles, UserInterface } from '@datatlas/models';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto implements Partial<UserInterface> {
  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  readonly role?: Roles;

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean = true;

  constructor(userDto: UpdateUserDto) {
    Object.assign(this, userDto);
  }
}
