import { Controller, Get, HttpCode, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect()
  @HttpCode(302)
  getDocs() {
    return { url: '/api' };
  }
}
