import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = never;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'john_pw',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'maria_pw',
    },
  ];

  async findOne(username: string): Promise<{ password: string; userId: number; username: string }> {
    return this.users.find((user) => user.username === username);
  }
}
