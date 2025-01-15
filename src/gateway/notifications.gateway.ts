import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HttpService } from './services/http.service';
import { AuthService } from 'src/gateway/services/auth/auth.service';

@WebSocketGateway({ namespace: 'notifications', cors: true })
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private activeUsers = new Map<string, string>();
  constructor(private readonly httpService: HttpService, 
    private readonly authService: AuthService,

  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const token = client.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        client.emit('error', 'Authentication token is required');
        client.disconnect();
        return;
      }

      const user = await this.authService.verifyUser(token);

      if (!user) {
        client.emit('error', 'Invalid token');
        client.disconnect();
        return;
      }

      this.activeUsers.set(client.id, user.uid);
      console.log(`User ${user.uid} connected via WebSocket`);
    } catch (error) {
      console.error('Error during connection:', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const userId = this.activeUsers.get(client.id);
    if (userId) {
      console.log(`User ${userId} disconnected`);
      this.activeUsers.delete(client.id);
    }
  }

 
  @SubscribeMessage('action')
  async handleAction(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    data = JSON.parse(data);
    try {
      const userId = this.activeUsers.get(client.id);
      if (!userId) {
        client.emit('error', 'User not authenticated');
        return;
      }

      console.log(`User ${userId} performed action: ${data.event}`);

      switch (data.event) {
        case 'update_role':
          //  logic
          client.emit('action_response', {
            status: 'success',
            message: 'Role updated successfully',
          });
          break;

        case 'delete_user':
          // logic
          client.emit('action_response', {
            status: 'success',
            message: 'User deleted successfully',
          });
          break;

        default:
          client.emit('error', 'Unknown action type');
          break;
      }
    } catch (error) {
      console.error('Error handling action:', error.message);
      client.emit('error', 'Failed to process action');
    }
  }

  @SubscribeMessage('admin')
  handleActionAdmin(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
     const adminId = this.activeUsers.get(client.id);
     const token = client.handshake.headers.authorization?.split(' ')[1];
     const userId = '123u29833972'
     if (!userId) {
      console.error('Invalid token');
      client.disconnect();
      return;
    }
    if (!adminId) {
      client.emit('error', 'Admin not authenticated');
      return { status: 'error', message: 'Admin not authenticated' };
    }

    
    this.notifyUser(data.targetUserId, `Action "${data.action}" performed by admin ${adminId}`);

    return { status: 'success', message: `Notification sent to user ${data.targetUserId}` };
  }

   private notifyUser(userId: string, message: string) {
    for (const [socketId, id] of this.activeUsers.entries()) {
      if (id === userId) {
        this.server.to(socketId).emit('notification', { message });
        console.log(`Notification sent to user ${userId}: ${message}`);
        return;
      }
    }
    console.warn(`User ${userId} not connected`);
  }
   
}
