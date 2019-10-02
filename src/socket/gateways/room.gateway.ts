import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Injectable, Logger} from '@nestjs/common';

@Injectable()
@WebSocketGateway({
    namespace: 'group',
})
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('RoomGateway');

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: any): void {
        this.logger.log(`RoomGateway send message: ${client.id}`);
        this.server.emit('msgToClient', payload);

    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`RoomGateway disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        const token = client.handshake.query.token;
        this.logger.log(`Query: ${token}`);
        this.logger.log(`RoomGateway connected: ${client.id}`);
    }
}
