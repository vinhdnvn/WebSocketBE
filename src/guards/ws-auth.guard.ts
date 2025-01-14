import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '../services/http.service';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const token = client.handshake.auth?.token;

    if (!token) {
      client.emit('error', 'Authentication token is required');
      return false;
    }

    const user = await this.httpService.verifyUser(token);
    if (!user) {
      client.emit('error', 'Invalid token');
      return false;
    }

    client.user = user; // Gắn user vào client để sử dụng sau
    return true;
  }
}
