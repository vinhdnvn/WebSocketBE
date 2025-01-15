import { Module } from '@nestjs/common';
import { GatewayWebsocket } from './gateway.websocket';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { HttpService } from 'src/common/services/http.service';
import { StockGateway } from '../stocks/stock.gateway';
import { AuthService } from 'src/auth/auth.service';

import { UserService } from 'src/users/user.service';
import { NotificationService } from 'src/notifications/notification.service';

@Module({
  providers: [
    GatewayWebsocket,
    NotificationsGateway,
    HttpService,
    StockGateway,
    AuthService,
    NotificationService,
    UserService,
  ],
})
export class GatewayModule {}
