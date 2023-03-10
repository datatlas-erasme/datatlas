import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

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

  async login(user: any) {
    const payload = { username: user.username, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload, jwtConstants),
    };
  }
}
