import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto, UpdateUserDto } from '@datatlas/dtos';
import { CanCreateUserGuard } from '../auth/can-create-user.guard';
import { CanGetUserGuard } from '../auth/can-get-user.guard';
import { CanGetUsersGuard } from '../auth/can-get-users.guard';
import { CanEditUserGuard } from '../auth/can-edit-user.guard';
import { CanDeleteUserGuard } from '../auth/can-delete_user.guard';

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
    const user = this.userService.getUserDto(id);
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    return user;
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
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    return await this.userService.updateUser({ ...updateUserDto, id: id });
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(CanDeleteUserGuard)
  @Header('Cache-Control', 'none')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUserById(id);
  }
}
