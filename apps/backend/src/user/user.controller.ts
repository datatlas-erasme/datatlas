import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto, UpdateUserDto } from '@datatlas/dtos';
import { AdminGuard } from '../auth/admin.guard';
import { ValidJwtGuard } from '../auth/validJwt.guard';
import { CanCreateUserGuard } from '../auth/can-create-user.guard';
import { CanGetUserGuard } from '../auth/can-get-user.guard';
import { CanGetUsersGuard } from '../auth/can-get-users.guard';
import { CanEditUserGuard } from '../auth/can-edit-user.guard';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // todo check if @headers should be placed on each route and if so, place them with proper options

  @Post()
  @HttpCode(201)
  @UseGuards(CanCreateUserGuard)
  @Header('Cache-Control', 'none')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @UseGuards(CanGetUserGuard)
  findOne(@Param('id') id: number): Promise<GetUserDto> {
    return this.userService.getUserDto(id);
  }

  @UseGuards(CanGetUsersGuard)
  @Get()
  async findAll(): Promise<GetUserDto[]> {
    return await this.userService.findAll();
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(CanEditUserGuard)
  @Header('Cache-Control', 'none')
  async updateUser(@Param() params, @Body() updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    const returnttt = await this.userService.updateUser({ ...updateUserDto, id: params.id });
    console.log('toto');
    console.log(returnttt);
    console.log('titi');
    return returnttt;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ValidJwtGuard, AdminGuard) // For now, only admins can do that.
  @Header('Cache-Control', 'none')
  /**
   * Delete a user in database using its user_id. Nothing is done if no user has this id.
   * Returns void.
   */
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUserById(id);
  }
}
