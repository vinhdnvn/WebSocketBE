import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { HttpService } from 'src/common/services/http.service';

@WebSocketGateway({ namespace: 'users', cors: true })
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer() server: Server;
  private activeUsers = new Map<string, string>();
  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization?.split(' ')[1];
    if (!token) {
      client.emit('error', 'Authentication token is required');
      client.disconnect();
      return;
    }
    console.log(`Client connected: ${client.id}`);
    const user = await this.authService.verifyUser(token);
    if (!user) {
      client.emit('error', 'Invalid token');
      client.disconnect();
      return;
    }
    this.activeUsers.set(client.id, user.uid);
    console.log(
      `User ${user.uid} connected to WebSocket, client id :${client.id}`,
    );
  }

  handleDisconnect(client: Socket) {
    const userId = this.activeUsers.get(client.id);
    if (userId) {
      console.log(
        `User ${userId} disconnected from WebSocket, client id :${client.id}`,
      );
    }
    this.activeUsers.delete(client.id);
  }

@SubscribeMessage('role-assign-user')
async handleAssignRole(@MessageBody() data: { roleId: string; userIds: string[] }) {
  console.log('Received data from client:', data);

  
  const targetClientIds = Array.from(this.activeUsers.entries())
    .filter(([clientId, uid]) => data.userIds.includes(uid))
    .map(([clientId]) => clientId);

  console.log('Target Client IDs:', targetClientIds);

 
  if (targetClientIds.length > 0) {
    targetClientIds.forEach((clientId) => {
      this.server.to(clientId).emit('receive-message', {
        message: `Role ${data.roleId} assigned to you`,
      });
      console.log(`Message sent to client ID: ${clientId}`);
    });
  } else {
    // Nếu không tìm thấy user nào, gửi lỗi về sender
    console.log('No active users found for the provided userIds');
    this.server.emit('error', {
      message: `No active users found for user IDs: ${data.userIds.join(', ')}`,
    });
  }

  // Gửi dữ liệu đến backend để xử lý đồng bộ
//   try {
//     const responseBackend = await this.httpService
//       .patch('http://localhost:5001/api/roles/assign-users-to-role', data)
   
//     console.log('Data sent to backend successfully:', responseBackend);
//   } catch (error) {
//     console.error('Error sending data to backend:', error.message);
//     this.server.emit('error', {
//       message: 'Error sending data to backend',
//       error: error.message,
//     });
//   }
}
}
