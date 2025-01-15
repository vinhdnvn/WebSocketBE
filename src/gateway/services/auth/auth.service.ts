import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get<string>('SECRET_KEY');
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      console.error('Invalid token:', error.message);
      return null;
    }
  }
  async verifyUser(token: string):Promise<any>  {
  try {
    const decoded = jwt.verify(token, this.secretKey);
    return decoded;

  } catch (error) {
  console.error('Failed to verify user:', error.message);
  return null;    
  } 
  }

}
