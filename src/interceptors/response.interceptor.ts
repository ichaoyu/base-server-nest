import {
	Injectable,
	Scope,
	NestInterceptor,
	HttpStatus,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';
import { MESSAGES } from '@/constants';

/**
 * 响应拦截器
 */
@Injectable({
	scope: Scope.REQUEST,
})
export class ResponseInterceptor implements NestInterceptor {
	constructor(private readonly configService: ConfigService) {}

	async intercept(context: ExecutionContext, next: CallHandler<any>) {
		const request = context.switchToHttp().getRequest();
		const { apiPath } = this.configService.get('app');
		const isApi = request.url.includes(apiPath);
		if (!isApi) {
			return next.handle();
		}
		return next.handle().pipe(
			map(data => ({
				status: HttpStatus.OK,
				message: MESSAGES.REQUEST_OK,
				data,
			})),
		);
	}
}
