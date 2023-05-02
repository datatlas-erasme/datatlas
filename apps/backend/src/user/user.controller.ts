import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@datatlas/dtos';
import { SelfOrAdminGuard } from '../auth/selfOrAdmin.guard';
import { AdminGuard } from '../auth/admin.guard';
import { ValidJwtGuard } from '../auth/validJwt.guard';
import { UserEntity } from './entities/user.entity';
import {CanCreateUserGuard} from "../auth/can-create-user.guard";

@ApiBearerAuth()
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
  @UseGuards(CanCreateUserGuard)
  @Header('Cache-Control', 'none')
  /**
   * Sends a 201 (with id user as a body response) if all works. In case of already existing email, nothing is done
   * and 0 is sent back.
   */
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @UseGuards(ValidJwtGuard, SelfOrAdminGuard)
  findOne(@Param('id') id: UserEntity['id']): Promise<UserEntity> {
    return this.userService.getUser(+id);
  }

  @Put(':id')
  @HttpCode(204)
  @UseGuards(ValidJwtGuard, AdminGuard) // For now, only admins can do that.
  @Header('Cache-Control', 'none')
  async updateUser(@Param() params, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.userService.updateUser(updateUserDto);
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
