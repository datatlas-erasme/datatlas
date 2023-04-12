import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  password?: string;

  constructor(createUserDto: CreateUserDto) {
    super(createUserDto);
    this.password = createUserDto.password;
  }
}
