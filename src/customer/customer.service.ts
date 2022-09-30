import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RequestCustomerDto } from './dto/request-customer.dto';
import { v4 as uuidv4 } from 'uuid';
import { ResponseCustomerDto } from './dto/response.customer.dto';
import { RedisService } from './redis.service';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);
  constructor(private readonly redisService: RedisService) {}

  async getById(id: string): Promise<ResponseCustomerDto> {
    const response: string = await this.redisService.redis.get(id);
    return {
      ...JSON.parse(response),
      _links: [
        {
          rel: 'update_customer',
          href: this.getUrl(id),
          method: 'PUT',
        },
      ],
    };
  }

  async update(
    id: string,
    requestCustomer: RequestCustomerDto,
  ): Promise<ResponseCustomerDto> {
    this.logger.log(id);
    const response = await this.redisService.redis.get(id);
    if (response) {
      await this.redisService.redis.set(id, JSON.stringify(requestCustomer));
      return {
        ...{ id, ...requestCustomer },
        _links: [
          {
            rel: 'find_customer',
            href: this.getUrl(id),
            method: 'GET',
          },
        ],
      };
    } else {
      throw new NotFoundException('Invalid Customer');
    }
  }

  async create(
    requestCustomer: RequestCustomerDto,
  ): Promise<ResponseCustomerDto> {
    const id = `customer:${uuidv4()}`;
    this.logger.log(id);
    await this.redisService.redis.append(id, JSON.stringify(requestCustomer));

    return {
      ...{ id, ...requestCustomer },
      _links: [
        {
          rel: 'update_customer',
          href: this.getUrl(id),
          method: 'PUT',
        },
        {
          rel: 'find_customer',
          href: this.getUrl(id),
          method: 'GET',
        },
      ],
    };
  }

  private getUrl(id: string): string {
    return `http://localhost:3000/customers/${id}`;
  }
}
