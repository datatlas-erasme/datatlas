import { Body, Controller, Delete, Get, Header, HttpCode, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '@datatlas/shared/models';
import { SelfOrAdminGuard } from '../auth/selfOrAdmin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(SelfOrAdminGuard)
  /**
   * Should always send back a UserDTO.
   * TODO : Guard ? à faire
   * @param params
   */
  getUser(@Param() params): number /*Promise<Omit<UserDto, 'password'>>*/ {
    //return this.userService.getUser(params.id);
    /*
    const toto = await ExtractJwt.fromAuthHeaderAsBearerToken();
    console.log(toto);
    Logger.log(toto);*/
    Logger.log(params);
    Logger.log('je suis /user/id');
    return 3;
  }

  /*             EVERYTHING BELOW SHOULD BE PROPERLY REWORKED                */
  @Get()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  async test(): Promise<string> {
    return 'ok';
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
