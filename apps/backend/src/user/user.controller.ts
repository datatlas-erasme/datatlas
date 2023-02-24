import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserPublicDTO } from '@datatlas/shared/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  async test(): Promise<string> {
    return 'ok';
  }

  @Get(':id')
  @HttpCode(200)
  /**
   * Should always send back a UserDTO.
   * TODO : Guard ?
   * @param params
   */
  getUser(@Param() params): Promise<UserPublicDTO> {
    return this.userService.getUser(params.id);
  }

  @HttpCode(201)
  @Post()
  @Header('Cache-Control', 'none')
  /**
   * Sends a 201 (with id user as a body response) if all works. In case of already existing username, nothing is done
   * and 0 is sent back.
   * TODO put a guard here but which one ?
   */
  async createUser(@Body() UserDto: UserDto) {
    return this.userService.createUser(UserDto);
  }

  @Put(':id')
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async updateUser(@Param() params, @Body() user: { userId: number } & UserDto): Promise<void> {
    return this.userService.updateUser(user);
  }

  @Delete(':id')
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  /**
   * Delete a user in database using its user_id. Nothing is done if no user has this id.
   * Returns void.
   * TODO : guard
   */
  async deleteUser(@Param() params): Promise<void> {
    return this.userService.deleteUserById(params.id);
  }
}
