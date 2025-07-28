import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { FastifyAdapter } from '@bull-board/fastify';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { Queue } from 'bull';
import { FastifyInstance } from 'fastify';

import { QUEUES } from '@/constants';
import { BULL_OPTIONS, BULL_QUEUES } from './options';

import { LoginLogProcessor } from './log-login.processor';
import { OperationLogProcessor } from './log-operation.processor';

@Module({})
export class QueuesModule implements NestModule {
  static register(): DynamicModule {
    const queues = BullModule.registerQueue(...BULL_QUEUES);

    if (!queues.providers || !queues.exports) {
      throw new Error('Unable to build queue');
    }

    return {
      global: true,
      module: QueuesModule,
      imports: [BullModule.forRootAsync(BULL_OPTIONS), queues],
      providers: [LoginLogProcessor, OperationLogProcessor, ...queues.providers],
      exports: [...queues.exports],
    };
  }

  constructor(
    private readonly adapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
    @InjectQueue(QUEUES.LOGIN_LOG)
    private readonly loginLogQueue: Queue,
    @InjectQueue(QUEUES.OPER_LOG)
    private readonly operLogQueue: Queue,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new FastifyAdapter();
    const { queuePath } = this.configService.get('app');

    createBullBoard({
      queues: [new BullAdapter(this.loginLogQueue), new BullAdapter(this.operLogQueue)],
      serverAdapter,
    });

    serverAdapter.setBasePath(queuePath);

    const instance: FastifyInstance = this.adapterHost.httpAdapter.getInstance();

    instance.register(serverAdapter.registerPlugin(), {
      prefix: queuePath,
    });
  }
}
