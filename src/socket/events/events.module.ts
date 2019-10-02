import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import {RoomGateway} from '../gateways/room.gateway';

@Module({
    providers: [EventsGateway, RoomGateway],
})
export class EventsModule {}
