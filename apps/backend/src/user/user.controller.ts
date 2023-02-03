import { Body, Controller, Get, Header, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Logger } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    Logger.log('info');
    return 'This action creates an admin user.';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all users';
  }
}
