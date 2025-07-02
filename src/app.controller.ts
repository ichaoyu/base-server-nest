import { Controller, Get, Param, Req, Request } from '@nestjs/common';
import { RouteConfig } from '@nestjs/platform-fastify';
import { AppService } from './app.service';

@Controller('/demo')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get(':id')
	getById(@Param() params: any): string {
		console.log('req: ', params.id);
		return params.id;
	}
}
