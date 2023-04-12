import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '@datatlas/models';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
