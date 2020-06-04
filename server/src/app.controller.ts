import { AuthGuard } from './auth.guard';
import { Controller, Get, Req, UseGuards, Post, Param, CacheTTL } from '@nestjs/common';
import { AppService } from './app.service';
import { getPack, Pack } from './packs';

@Controller()
export class AppController {
  @Get('version')
  reportVersion() {
    return { version: process.env.npm_package_version };
  }

  @Get()
  home() {
    return { status: 'ok' };
  }
}
