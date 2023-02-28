import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<boolean> {
    //const user = await this.userService.findOne(username);
    /*
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
     */
    Logger.log(username, pass);
    return true;
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
