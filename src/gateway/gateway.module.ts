import { Module } from '@nestjs/common';
import { GatewayWebsocket } from './gateway.websocket';
import { NotificationsGateway } from './notifications.gateway';
import { HttpService } from 'src/services/http.service';
import { StockGateway } from './stock.gateway';

@Module({
  providers: [
    GatewayWebsocket,
    NotificationsGateway,
    HttpService,
    StockGateway,
  ],
})
export class GatewayModule {}
