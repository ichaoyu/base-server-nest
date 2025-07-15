import {
	Catch,
	ExceptionFilter,
	Inject,
	NotFoundException,
	LoggerService,
	ArgumentsHost,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { MESSAGES } from '@/constants';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly loggerService: LoggerService,
		private readonly configService: ConfigService,
		private readonly httpAdapterHost: HttpAdapterHost,
	) {}
	catch(exception: NotFoundException, host: ArgumentsHost) {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();
		const status = exception.getStatus();
		const request = ctx.getRequest();
		const { apiPath } = this.configService.get('app');
		const isApi = request.url.includes(apiPath);

		if (isApi) {
			const message = `${MESSAGES.NOT_FOUND}: ${exception.message}`;

			this.loggerService.error(
				message,
				exception.stack,
				NotFoundExceptionFilter.name,
			);

			httpAdapter.reply(ctx.getResponse(), { status, message }, status);
		}
	}
}
