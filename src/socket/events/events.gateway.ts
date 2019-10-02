import {
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server, Socket } from 'socket.io';
import {Logger, UseGuards} from '@nestjs/common';
import {middleware} from '../../middleware/app.middleware';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('AppGateway');

    @SubscribeMessage('events')
    findAll(client: Client, data: any): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }

    // @UseGuards(WsJwtGuard)
    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        this.logger.log(`Client send message: ${client.id}`);
        this.server.emit('msgToClient', payload);
    }

    @SubscribeMessage('identity')
    async identity(client: Client, data: number): Promise<number> {
        return data;
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}
