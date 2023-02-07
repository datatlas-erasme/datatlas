import { Body, Controller, Get, Header, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    Logger.log('This action creates an admin user.');
    return this.userService.createAdmin(createAdminDto);
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all users';
  }
}
