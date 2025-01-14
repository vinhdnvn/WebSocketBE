import { Logger, OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";




@WebSocketGateway()
export class GatewayWebsocket implements OnModuleInit {
    @WebSocketServer() server;
    private logger: Logger = new Logger('EventsGateway');
    private connectedClients: Map<string, any> = new Map(); // Lưu trữ connected clients


    onModuleInit() {
        this.server.on('connection', (socket) => {
            this.logger.debug(`Client connected: ${socket.id}`);
            this.connectedClients.set(socket.id, {
                socketId: socket.id,
                userId: null,
                connectedAt: new Date()
            });
            
     
            this.logger.debug(`Total connected clients: ${this.connectedClients.size}`);
            
            socket.on('disconnect', () => {
                this.logger.debug(`Client disconnected: ${socket.id}`);
                this.connectedClients.delete(socket.id);
                this.logger.debug(`Total connected clients: ${this.connectedClients.size}`);
            });
        });
        
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body:any) {
        console.log(body)
        this.server.emit('onMessage', body);
    }

    @SubscribeMessage('logUserIni')
    onMessage(@MessageBody() body:any) {
        console.log('logUserIni', body)
        console.log('user already logged in and connected')
        this.server.emit('onMessage', body)
    }


     @SubscribeMessage('subscribe')
  handleSubscribe(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    client.join(`notifications:${data.userId}`);
    console.log(`User ${data.userId} subscribed to notifications.`);
    return { status: 'ok', message: `User ${data.userId} successfully subscribed.` };
  }

    @SubscribeMessage('ping')
    ping() {
        this.server.emit('onMessage', 'pong');
    }
    @SubscribeMessage('getConnectedClients')
    handleGetConnectedClients() {
        return Array.from(this.connectedClients.values());
    }
    }