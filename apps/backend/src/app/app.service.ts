import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Roles } from '@datatlas/models';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService, private readonly orm: MikroORM) {}

  @UseRequestContext()
  async onApplicationBootstrap(): Promise<void> {
    // What shall we do at each startup?
    // -> Seed the database
    //     -> Users : create one admin user (for true final purpose) and one simple dummy user (for tests)
    // -> todo : explain all tasks made during startup
    Logger.log('SEEDING USERS --- using data from your apps/backend/.env file');
    const userAdmin = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: Roles.ADMIN
    };
    const userDummyEditor = {
      email: process.env.DUMMY_EDITOR_EMAIL,
      password: process.env.DUMMY_EDITOR_PASSWORD,
      role: Roles.EDITOR,
    };
    await this.userService.createUsersOnStartUp(userAdmin, userDummyEditor);
  }
}
