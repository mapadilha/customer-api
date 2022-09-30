import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenValidationService } from './token-validation.service';

const mockHttpService = () => ({
  get: jest.fn(),
});

describe('TokenValidationService', () => {
  let service: TokenValidationService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenValidationService,
        {
          provide: HttpService,
          useFactory: mockHttpService,
        },
      ],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    service = module.get<TokenValidationService>(TokenValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be validate success', async () => {
    httpService.get = jest.fn().mockResolvedValue(true);
    await service.validate('token');
    expect(httpService.get).toHaveBeenCalled();
  });
});
