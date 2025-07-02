import { Test, TestingModule } from '@nestjs/testing';
import { DemoApiController } from './demo-api.controller';
import { DemoApiService } from './demo-api.service';

describe('DemoApiController', () => {
  let controller: DemoApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoApiController],
      providers: [DemoApiService],
    }).compile();

    controller = module.get<DemoApiController>(DemoApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
