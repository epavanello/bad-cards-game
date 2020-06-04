import { Controller, Get, CacheTTL, Param, UseGuards, Req, Post } from '@nestjs/common';
import { Pack, getPack } from 'src/packs';
import { AppService } from 'src/app.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('game')
export class GameController {
  constructor(private readonly appService: AppService) {}

  @Get('pack/:lang/:packID')
  @CacheTTL(1)
  pack(@Param('lang') lang: string, @Param('packID') packID: string): Pack {
    return getPack(lang.substring(0, 2), +packID);
  }

  @UseGuards(AuthGuard)
  @Get('createRoom/:lang')
  async createRoom(@Req() request, @Param('lang') lang: string) {
    if (!['it', 'en'].includes(lang.substring(0, 2))) {
      return {
        error: 'Bad language',
      };
    }
    return {
      roomID: await this.appService.createRoom(request.user.uid, lang.substring(0, 2), 1),
    };
  }

  @UseGuards(AuthGuard)
  @Get('joinExisting')
  async joinExisting() {
    try {
      return {
        roomID: await this.appService.getFirstOpenRoom(),
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Post('sendWinner')
  async sendWinner(@Req() request) {
    this.appService.setWinner(request.body.player, request.body.roomID);
  }
}
