import { Body, Controller, Delete, Get, Header, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserByIdDto } from '@datatlas/shared/models';
import { UserDto } from '@datatlas/shared/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async createUser(@Body() UserDto: UserDto) {
    // todo mettre une garde auth spécialisée
    Logger.log('This action creates a simple user.');
    Logger.log(UserDto.username);
    return this.userService.createUser(UserDto);
  }

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    // TODO mettre une garde auth spécialisée.
    Logger.log('This action creates an admin user.');
    return this.userService.createAdmin(createAdminDto);
  }

  @Delete()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async deleteUser(@Body() userDto: UserByIdDto) {
    // TODO mettre une garde auth spécialisée.
    Logger.log('essai de suppression');
    return this.userService.DeleteUserById(userDto.idUser);
  }

  @Get()
  findAll(@Req() request: Request): string {
    Logger.log(request);
    return 'This action returns all users';
  }
}
