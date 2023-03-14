import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';
import { UserDto } from '@datatlas/models';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<boolean> {
    // Same username ?
    const user = await this.userService.isUsernameAlreadyInDatabase(username);
    if (user) {
      // Same encrypted password ?
      const userCredentials = await this.userService.getUserByUserName(username);
      return await bcrypt.compare(pass, userCredentials.password);
    }
    return false;
  }

  async login(user: Pick<UserDto, 'username' | 'password'>) {
    Logger.log(user);
    const userCredentials = await this.userService.getCompleteUserByUserName(user.username);
    const payload = {
      username: userCredentials.username,
      id: userCredentials.id,
      role: userCredentials.role,
      active: userCredentials.active,
    };
    return {
      access_token: this.jwtService.sign(payload, jwtConstants),
    };
  }
}
