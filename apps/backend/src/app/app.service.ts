import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService) {}

  getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }

  onApplicationBootstrap(): any {
    // What shall we do at each startup?
    // -> Seed the database
    //     -> Users : create one admin user (for true final purpose) and one simple dummy user (for tests)
    // -> todo : explain all tasks made during startup
    console.log('SEEDING USERS --- check your .env file');
    this.userService.createUsersOnStartUp('titi').then((r) => console.log(r));
  }
}
