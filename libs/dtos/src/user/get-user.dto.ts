import { Roles, PublicUserInterface } from '@datatlas/models';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class GetUserDto implements PublicUserInterface {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly email: string;

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
