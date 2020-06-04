import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameController } from './game/game.controller';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  controllers: [AppController, GameController],
  providers: [AppService],
})
export class AppModule {}
