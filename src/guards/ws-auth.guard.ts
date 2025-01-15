import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from 'src/gateway/services/auth/auth.service';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const token = client.handshake.auth?.token;

    if (!token) {
      client.emit('error', 'Authentication token is required');
      return false;
    }

    const user = await this.authService.verifyUser(token);
    if (!user) {
      client.emit('error', 'Invalid token');
      return false;
    }

    client.user = user;
    return true;
  }
}
