import { RedisService } from './redis.service';

describe('AuthGuard', () => {
  let redisService: RedisService;

  beforeEach(async () => {
    redisService = new RedisService();
  });

  it('should be canActivate', async () => {
    expect(redisService.redis).toBeDefined();
  });

  afterAll(() => redisService.redis.quit());
});
