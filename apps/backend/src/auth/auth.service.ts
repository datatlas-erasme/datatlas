import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';
import { LoginDto, LoginResponse } from '@datatlas/dtos';
import { UserCredentials, UserCredentialsInterface } from '@datatlas/models';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(loginDto: LoginDto): Promise<boolean> {
    // Same email ?
    const exists = await this.userService.isEmailAlreadyInDatabase(loginDto.email);
    if (exists) {
      // Same encrypted password ?
      const user = await this.userService.getUserByEmail(loginDto.email);
      return await bcrypt.compare(loginDto.password, user.password);
    }
    return false;
  }

  async login(user: LoginDto): Promise<LoginResponse> {
    const userCredentials = await this.userService.getUserByEmail(user.email);
    const payload: UserCredentialsInterface = {
      email: userCredentials.email,
      id: userCredentials.id,
      role: userCredentials.role,
      active: userCredentials.active,
    };
    return {
      access_token: this.jwtService.sign(payload, jwtConstants),
      user_id: userCredentials.id,
    };
  }

  async getLoggedUserCredentials(request): Promise<UserCredentials> {
    const { headers } = request;
    if (!headers['authorization']) {
      return null;
    }
    const headerString = headers['authorization'].split(' ');
    if (headerString.length !== 2) {
      // No bearer token fount.
      return null;
    }
    const decode = this.jwtService.decode(headerString[1]);
    if (decode === null) {
      // Unknown bearer token.
      return null;
    }
    return new UserCredentials(decode as UserCredentialsInterface);
  }
}
