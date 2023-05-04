import { Roles, UserInterface } from '@datatlas/models';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto implements Partial<UserInterface> {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  password?: string;

  @IsString()
  @IsOptional()
  readonly role?: Roles = Roles.EDITOR;

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean = true;

  constructor(userDto: UpdateUserDto) {
    Object.assign(this, userDto);
  }
}
