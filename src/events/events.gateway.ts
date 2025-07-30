import { UseFilters, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { interval, map, mergeAll, Observable } from 'rxjs';
import { Server } from 'ws';

import { EVENTS } from '@/constants';
import { Permission } from '@/decorators';
import { WsDefaultFilter } from '@/filters';
import { WsAuthGuard } from '@/guards';

import { EventsService } from './events.service';

@WebSocketGateway({ cors: true, transports: ['websocket'] })
@UseGuards(WsAuthGuard)
@UseFilters(WsDefaultFilter)
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(EVENTS.SERVER_INFO)
  @Permission('monitor:server:list')
  getServerInfo(): Observable<WsResponse<any>> {
    return interval(1000).pipe(
      map(async () => {
        const data = await this.eventsService.handleGetInfo();

        return { event: EVENTS.SERVER_INFO, data };
      }),
      mergeAll(),
    );
  }
}
