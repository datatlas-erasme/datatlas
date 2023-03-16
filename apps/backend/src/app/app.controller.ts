import { Controller, Request, Post, UseGuards, Logger } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const test = await this.authService.login(req.body);
    Logger.log(test);
    return test;
  }
  /*
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('début route profile');
    console.log(req);
    Logger.log('intérieur de la fonction de profile');
    return req.user;
  }*/
}
