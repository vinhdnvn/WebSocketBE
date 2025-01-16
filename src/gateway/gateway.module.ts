import { Module } from '@nestjs/common';

import { NotificationsGateway } from './notifications/notifications.gateway';
import { HttpService } from 'src/common/services/http.service';
import { StockGateway } from './stocks/stock.gateway';
import { AuthService } from 'src/auth/auth.service';

import { UserService } from 'src/gateway/users/user.service';
import { NotificationService } from 'src/gateway/notifications/notification.service';
import { UserGateway } from 'src/gateway/users/user.gateway';

@Module({
  providers: [
  
    NotificationsGateway,
    HttpService,
    StockGateway,
    AuthService,
    NotificationService,
    UserService,
    UserGateway
  ],
})
export class GatewayModule {}
