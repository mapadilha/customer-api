import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { RequestCustomerDto } from './dto/request-customer.dto';
import { RedisService } from './redis.service';

const mocRedisService = () => ({
  redis: () => ({
    get: jest.fn(),
    append: jest.fn(),
    set: jest.fn(),
  }),
});

const requestCustomer: RequestCustomerDto = {
  name: 'Customer',
  document: 12345,
};

const customer: CustomerDto = {
  id: 'customr:uuid',
  name: 'Customer',
  document: 12345,
};

const customerStr: string = JSON.stringify(customer);

describe('CustomerService', () => {
  let service: CustomerService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: RedisService,
          useFactory: mocRedisService,
        },
      ],
    }).compile();

    redisService = module.get<RedisService>(RedisService);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be getById success', async () => {
    redisService.redis.get = jest.fn().mockResolvedValue(customerStr);
    await service.getById('');
    expect(redisService.redis.get).toHaveBeenCalled();
  });

  it('should be create success', async () => {
    redisService.redis.append = jest.fn().mockResolvedValue(customerStr);
    await service.create(requestCustomer);
    expect(redisService.redis.append).toHaveBeenCalled();
  });

  it('should be update success', async () => {
    redisService.redis.get = jest.fn().mockResolvedValue(customerStr);
    redisService.redis.set = jest.fn().mockResolvedValue(customerStr);
    await service.update('', requestCustomer);
    expect(redisService.redis.set).toHaveBeenCalled();
  });
});
