import { Roles, UserInterface } from '@datatlas/models';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto implements Omit<Partial<UserInterface>, 'password'> {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsString()
  readonly role: Roles = Roles.EDITOR;

  @IsBoolean()
  readonly active: boolean = true;

  constructor(getUserDto: GetUserDto) {
    Object.assign(this, getUserDto);
  }
}
