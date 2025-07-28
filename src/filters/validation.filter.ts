import {
  Catch,
  ExceptionFilter,
  Inject,
  LoggerService,
  UnprocessableEntityException,
  ArgumentsHost,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpAdapterHost } from '@nestjs/core';
import { MESSAGES } from '@/constants';

/**
 * 参数校验错误处理
 */
@Catch(UnprocessableEntityException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const status = exception.getStatus();
    const message = `${MESSAGES.UNPROCESSABLE_ENTITY}: ${exception.message}`;

    this.loggerService.error(message, exception.stack, ValidationExceptionFilter.name);

    httpAdapter.reply(ctx.getResponse(), { status, message }, status);
  }
}
