import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { HttpModule } from '@nestjs/axios';
import { TokenValidationService } from './token-validation.service';
import { RedisService } from './redis.service';

@Module({
  imports: [HttpModule],
  controllers: [CustomerController],
  providers: [TokenValidationService, CustomerService, RedisService],
})
export class CustomerModule {}
