import {
	Catch,
	ExceptionFilter,
	Inject,
	ArgumentsHost,
	LoggerService,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpAdapterHost } from '@nestjs/core';
import { MESSAGES } from '@/constants';
/**
 * 默认异常过滤器
 */
@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly loggerService: LoggerService,
		private readonly httpAdapter: HttpAdapterHost,
	) {}
	catch(exception: unknown, host: ArgumentsHost) {
		const { httpAdapter } = this.httpAdapter;
		const ctx = host.switchToHttp();
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;
		const message =
			exception instanceof HttpException
				? exception.getResponse()
				: MESSAGES.INTERNAL_SERVER_ERROR;

		this.loggerService.error(
			message,
			// @ts-ignore
			exception.stack,
			DefaultExceptionFilter.name,
		);

		httpAdapter.reply(ctx.getResponse(), { status, message }, status);
	}
}
