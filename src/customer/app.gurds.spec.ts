import { AuthGuard } from './app.gurds';

const req = { headers: {} };
req.headers['authorization'] = 'Bearer hshgaagf';

const switchToHttp = () => ({
  getRequest: () => req,
});

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let context: any;

  beforeEach(async () => {
    authGuard = new AuthGuard();
    context = { switchToHttp: switchToHttp };
  });

  it('should be defined', async () => {
    expect(authGuard).toBeDefined();
  });

  it('should be canActivate', async () => {
    expect(authGuard.canActivate(context)).toBeDefined();
  });
});
