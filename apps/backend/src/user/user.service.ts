import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private readonly user: User[] = [];

  create(user: User) {
    this.user.push(user);
  }

  findAll(): User[] {
    return this.user;
  }
}
