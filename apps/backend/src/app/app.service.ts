import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService, private readonly orm: MikroORM) {}

  @UseRequestContext()
  async onApplicationBootstrap(): Promise<void> {
    // What shall we do at each startup?
    // -> Seed the database
    //     -> Users : create one admin user (for true final purpose) and one simple dummy user (for tests)
    // -> todo : explain all tasks made during startup
    console.log('SEEDING USERS --- using data from your apps/backend/.env file');
    const userAdmin = { username: process.env.ADMIN_USER, password: process.env.ADMIN_PASSWORD };
    await this.userService.createUsersOnStartUp(userAdmin);
  }
}
