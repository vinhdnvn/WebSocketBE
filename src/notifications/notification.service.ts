import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { HttpService } from 'src/common/services/http.service';


@Injectable()
export class NotificationService {
  private backendUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.backendUrl = this.configService.get<string>('BACKEND_URL');
  }

  async sendNotification(notificationData: any): Promise<any> {
    const url = `${this.backendUrl}/notifications`;
    return this.httpService.post(url, notificationData);
  }
}
