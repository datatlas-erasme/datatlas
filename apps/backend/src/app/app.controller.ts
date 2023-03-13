import { Controller, Request, Post, UseGuards, Get, Logger } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const test = await this.authService.login(req.user);
    //Logger.log(test);
    return test;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('début route profile');
    console.log(req);
    Logger.log('intérieur de la fonction de profile');
    return req.user;
  }
}
