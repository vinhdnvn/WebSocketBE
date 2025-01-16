import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { HttpService } from 'src/common/services/http.service';

@Injectable()
export class UserService {
  private readonly backendURL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.backendURL = this.configService.get<string>('BACKEND_URL');
  }

  async getAllUserInfo(token: string): Promise<any> {
    const url = `${this.backendURL}/users`;
    return this.httpService.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
