// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Req, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from './app.gurds';
import { TokenValidationService } from './token-validation.service';
import { RequestCustomerDto } from './dto/request-customer.dto';
import { ResponseCustomerDto } from './dto/response.customer.dto';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly _customerService: CustomerService,
    private readonly _tokenValidationService: TokenValidationService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getById(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ResponseCustomerDto> {
    if (
      await this._tokenValidationService.validate(req.headers['Authorization'])
    ) {
      return this._customerService.getById(id);
    } else {
      throw new UnauthorizedException('Customer Unauthorized');
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() requestCustomer: RequestCustomerDto,
    @Req() req,
  ): Promise<ResponseCustomerDto> {
    if (
      await this._tokenValidationService.validate(req.headers['Authorization'])
    ) {
      return this._customerService.create(requestCustomer);
    } else {
      throw new UnauthorizedException('Customer Unauthorized');
    }
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() requestCustomer: RequestCustomerDto,
    @Req() req,
  ): Promise<ResponseCustomerDto> {
    if (
      await this._tokenValidationService.validate(req.headers['Authorization'])
    ) {
      return this._customerService.update(id, requestCustomer);
    } else {
      throw new UnauthorizedException('Customer Unauthorized');
    }
  }
}
