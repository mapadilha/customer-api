import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './app.gurds';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { RequestCustomerDto } from './dto/request-customer.dto';
import { TokenValidationService } from './token-validation.service';

const mockCustomerService = () => ({
  getById: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
});
const mockTokenValidationService = () => ({
  validate: jest.fn(),
});
const mockGuards = () => ({
  canActivate: jest.fn(),
});

const requestCustomer: RequestCustomerDto = {
  name: 'Customer',
  document: 12345,
};
const req = { headers: {} };
req.headers['Authorization'] = 'Bearer hshgaagf';

describe('CustomerController', () => {
  let controller: CustomerController;
  let tokenValidationService: TokenValidationService;
  let customerService: CustomerService;
  let authGuards: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CustomerService,
          useFactory: mockCustomerService,
        },
        {
          provide: TokenValidationService,
          useFactory: mockTokenValidationService,
        },
        {
          provide: AuthGuard,
          useFactory: mockGuards,
        },
      ],
      controllers: [CustomerController],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    customerService = module.get<CustomerService>(CustomerService);
    tokenValidationService = module.get<TokenValidationService>(
      TokenValidationService,
    );
    authGuards = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('should be getById success', async () => {
    tokenValidationService.validate = jest.fn().mockResolvedValue(true);
    await controller.getById('', req);
    expect(tokenValidationService.validate).toHaveBeenCalled();
  });

  it('should be create success', async () => {
    tokenValidationService.validate = jest.fn().mockResolvedValue(true);
    await controller.create(requestCustomer, req);
    expect(tokenValidationService.validate).toHaveBeenCalled();
  });

  it('should be update success', async () => {
    tokenValidationService.validate = jest.fn().mockResolvedValue(true);
    await controller.update('', requestCustomer, req);
    expect(tokenValidationService.validate).toHaveBeenCalled();
  });
});
