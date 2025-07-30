import { ArgumentsHost, Catch, HttpStatus, Inject, LoggerService } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

/**
 * 默认错误处理
 */
@Catch()
export class WsDefaultFilter extends BaseWsExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
  ) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<WebSocket>();

    const error = exception instanceof WsException ? exception.getError() : exception;
    const data =
      error instanceof Error
        ? {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
          }
        : error;

    this.loggerService.error(HttpStatus.INTERNAL_SERVER_ERROR, error, WsDefaultFilter.name);

    client.send(
      JSON.stringify({
        event: 'error',
        data,
      }),
    );
  }
}
