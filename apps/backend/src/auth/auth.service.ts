import { Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';
import { UserDto } from '@datatlas/models';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(userToValidate: Pick<UserDto, 'username' | 'password'>): Promise<boolean> {
    // Same username ?
    const user = await this.userService.isUsernameAlreadyInDatabase(userToValidate.username);
    if (user) {
      // Same encrypted password ?
      const userCredentials = await this.userService.getUserByUserName(userToValidate.username);
      return await bcrypt.compare(userToValidate.password, userCredentials.password);
    }
    return false;
  }

  async login(user: Pick<UserDto, 'username' | 'password'>) {
    const userCredentials = await this.userService.getUserByUserName(user.username);
    const payload = {
      username: userCredentials.username,
      id: userCredentials.id,
      role: userCredentials.role,
      active: userCredentials.active,
    };
    return {
      access_token: this.jwtService.sign(payload, jwtConstants),
      user_id: userCredentials.id,
    };
  }

  getUserFromRequest(bearerToken:string): Omit<UserDto, 'password'>{
    const headerString = bearerToken.split(' ');
    return this.jwtService.decode(headerString[1]) as { [key: string]: never };
  }
}
