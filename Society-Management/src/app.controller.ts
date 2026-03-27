import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CommuteService } from './commute-service/commute.service';
import type { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private commute : CommuteService) {}

  @Get('welcome')
  getHello(): string {
    return this.appService.getHello();
  }

  // @ApiBearerAuth('access-token')
  //  @Get('commute')
  // getUsers(@Req() req : Request): any {
  //   return this.commute.getUserProfile(req);
  // }
}
