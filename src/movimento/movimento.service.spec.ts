import { Test, TestingModule } from '@nestjs/testing';
import { MovimentoService } from './movimento.service';

describe('MovimentoService', () => {
  let service: MovimentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimentoService],
    }).compile();

    service = module.get<MovimentoService>(MovimentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
