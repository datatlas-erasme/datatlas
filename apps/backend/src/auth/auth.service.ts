import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<boolean> {
    const user = await this.userService.isUsernameAlreadyInDatabase(username);
    if (user) {
      // Same encrypted password ?
      const userCredentials = await this.userService.getUserByUserName(username);
      return await bcrypt.compare(pass, userCredentials.password);
    }
    return false;
  }

  async login(user: never) {
    /*
    const payload = { username: user.username, password: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };

     */
    Logger.log(user);
  }
}
