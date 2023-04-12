import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from '@datatlas/shared/models';
import { SelfOrAdminGuard } from '../auth/selfOrAdmin.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // todo check if @headers should be placed on each route and if so, place them with proper options

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
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @UseGuards(SelfOrAdminGuard)
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUser(+id);
  }

  @Put(':id')
  @HttpCode(204)
  @UseGuards(AdminGuard) // For now, only admins can do that.
  @Header('Cache-Control', 'none')
  async updateUser(@Param() params, @Body() user: UserDto): Promise<void> {
    user.id = params.id;
    return this.userService.updateUser(user);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AdminGuard) // For now, only admins can do that.
  @Header('Cache-Control', 'none')
  /**
   * Delete a user in database using its user_id. Nothing is done if no user has this id.
   * Returns void.
   */
  async deleteUser(@Param() params): Promise<void> {
    return this.userService.deleteUserById(params.id);
  }
}
