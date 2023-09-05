import { Test, TestingModule } from '@nestjs/testing';
import { MovimentoController } from './movimento.controller';

describe('MovimentoController', () => {
  let controller: MovimentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimentoController],
    }).compile();

    controller = module.get<MovimentoController>(MovimentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
