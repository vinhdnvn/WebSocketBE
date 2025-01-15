import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import axios from 'axios';
import { Socket } from 'socket.io';
import { HttpService } from 'src/common/services/http.service';

@WebSocketGateway({
  namespace: 'stocks',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class StockGateway implements OnGatewayConnection, OnGatewayDisconnect {
constructor(
  private readonly httpService: HttpService,
) {}
  @WebSocketServer() server;
  private connectedClients: Map<string, any> = new Map();

  handleConnection(client: any) {
    console.log('Client connected: ' + client.id);
    this.connectedClients.set(client.id, {
      socketId: client.id,
      userId: null,
      connectedAt: new Date(),
    });
    console.log('Total connected clients: ' + this.connectedClients.size);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected: ' + client.id);
    this.connectedClients.delete(client.id);
    console.log('Total connected clients: ' + this.connectedClients.size);
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`stocks:${data.userId}`);

    let count = 1;
    const interval = setInterval(() => {
      if (count > 1000) {
        clearInterval(interval);
        console.log(`Completed emitting values for user ${data.userId}`);
      } else {
        this.server.to(`stocks:${data.userId}`).emit('count', count);
        count++;
      }
    }, 1000);

    return {
      status: 'ok',
      message: `User ${data.userId} successfully subscribed.`,
    };
  }
  // test
  @SubscribeMessage('ping')
  async ping() {
    // call axios api
    

    const response = await this.httpService.get("https://api.currencyapi.com/v3/status?apikey=cur_live_1dOAy6wOMemui1lMyRgVAvZvsW6PAzJtTcQnK1x8");
    console.log(response);
    const remain = response;
    this.server.emit('onMessage', remain);
  }
}
