import { Body, Controller, Get, Header, HttpCode, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}