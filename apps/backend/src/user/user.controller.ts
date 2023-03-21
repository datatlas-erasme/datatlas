import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '@datatlas/shared/models';
import { SelfOrAdminGuard } from '../auth/selfOrAdmin.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  async test(): Promise<string> {
    return 'ok';
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AdminGuard)
  @Header('Cache-Control', 'none')
  /**
   * Sends a 201 (with id user as a body response) if all works. In case of already existing username, nothing is done
   * and 0 is sent back.
   */
  async createUser(@Body() UserDto: UserDto) {
    return this.userService.createUser(UserDto);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(SelfOrAdminGuard)
  /**
   * Should always send back a UserDTO.
   * @param params
   */
  async getUser(@Param() params): Promise<Omit<UserDto, 'password'>> {
    return await this.userService.getUser(params.id);
  }

  /*             EVERYTHING BELOW SHOULD BE PROPERLY REWORKED                */

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
