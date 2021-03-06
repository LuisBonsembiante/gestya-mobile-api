import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import {middleware} from '../../middleware/app.middleware';

//const redisAdapter = redisIoAdapter({ host: 'localhost', port: 6379 });

export class RedisIoAdapter extends IoAdapter {
    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options);
        server.use(middleware);
        return server;
    }
}
