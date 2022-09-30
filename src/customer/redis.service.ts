import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly _redis: Redis = new Redis();

  get redis(): Redis {
    return this._redis;
  }
}
