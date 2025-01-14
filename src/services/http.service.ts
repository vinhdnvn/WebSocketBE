import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class HttpService {
  private backendUrl: string;
  private readonly secretKey: string;
  constructor(private configService: ConfigService) {
    this.backendUrl = this.configService.get<string>('BACKEND_URL');
    this.secretKey = this.configService.get<string>('SECRET_KEY');
  }

  async verifyUser(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      console.error('Failed to verify user:', error.message);
      return null;
    }
  }

  // Gửi action từ client đến backend
  async sendActionToBackend(actionData: any): Promise<any> {
    try {
      const response = await axios.post(
        `${this.backendUrl}/actions`,
        actionData,
      );
      return response.data;
    } catch (error) {
      console.error('Failed to send action to backend:', error.message);
      throw new Error('Backend processing failed');
    }
  }
}
