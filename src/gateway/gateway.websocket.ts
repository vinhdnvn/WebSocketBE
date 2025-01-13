import { Logger, OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";




@WebSocketGateway()
export class GatewayWebsocket implements OnModuleInit {
    @WebSocketServer() server;

private logger: Logger = new Logger('EventsGateway');

    onModuleInit() {
       this.server.emit(`Client ${this.server.id} connected`);

        
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

    @SubscribeMessage('ping')
    ping():string {
        return 'pong';
    }
    }