import { Module } from '@nestjs/common';
import { GatewayWebsocket } from './gateway.websocket';

@Module({
  
    providers: [GatewayWebsocket],
})
export class GatewayModule {}
