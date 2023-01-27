import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
