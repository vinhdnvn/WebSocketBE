import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'stocks', cors: true })
export class StockGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server;
  private connectedClients: Map<string, any> = new Map(); 

  handleConnection(client: any, ...args: any[]) {
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
   

    // Gửi giá trị từ 1 đến 1000
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

  @SubscribeMessage('ping')
  ping() {
    this.server.emit('onMessage', 'pong');
  }
}
