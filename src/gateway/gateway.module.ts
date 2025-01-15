import { Module } from '@nestjs/common';
import { GatewayWebsocket } from './gateway.websocket';
import { NotificationsGateway } from './notifications.gateway';
import { HttpService } from 'src/gateway/services/http.service';
import { StockGateway } from './stock.gateway';
import { AuthService } from 'src/gateway/services/auth/auth.service';
import { NotificationService } from 'src/gateway/services/notification/notification.service';
import { UserService } from 'src/gateway/services/user/user.service';

@Module({
  providers: [
    GatewayWebsocket,
    NotificationsGateway,
    HttpService,
    StockGateway,
    AuthService,
    NotificationService,
    UserService
  ],
})
export class GatewayModule {}
