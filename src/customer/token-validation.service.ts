import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class TokenValidationService {
  constructor(private httpService: HttpService) {}

  async validate(token: string): Promise<boolean> {
    try {
      const resp = await firstValueFrom(
        this.httpService.get(
          `https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/valid-token/${token}`,
        ),
      );
      return resp.data;
    } catch (error: Error | any) {
      //FIXME Aguardando finalização da API que valida o token, mudar return para false
      return true;
    }
  }
}
