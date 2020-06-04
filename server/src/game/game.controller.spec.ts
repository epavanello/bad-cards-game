import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';

describe('Game Controller', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
