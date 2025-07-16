import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE, APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { CacheModule } from '@nestjs/cache-manager';

import { RedisModule } from '@app/redis';

import config from './config';
import { LOGGER_OPTIONS } from './utils';
import { CommonModule } from './apis/common';
import { ApiModule } from './apis';
import { ResponseInterceptor } from './interceptors';
import { ValidationPipe } from './pipes';
import {
	DefaultExceptionFilter,
	NotFoundExceptionFilter,
	ValidationExceptionFilter,
} from './filters';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config],
			isGlobal: true,
		}),
		WinstonModule.forRootAsync(LOGGER_OPTIONS),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				...configService.get('typeorm'),
			}),
			inject: [ConfigService],
		}),
		CacheModule.registerAsync({
			isGlobal: true,
			useFactory(configService: ConfigService) {
				return configService.get('cache');
			},
			inject: [ConfigService],
		}),
		RedisModule.registerAsync({
			global: true,
			createType: 'client',
			clientToken: Symbol('REDIS_CLIENT'),
			optionsToken: Symbol('REDIS_CLIENT_OPTIONS'),
			optionsProvider: {
				useFactory: (configService: ConfigService) => {
					return configService.get('redis');
				},
				inject: [ConfigService],
			},
		}),
		CommonModule,
		ApiModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_FILTER,
			useClass: ValidationExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: DefaultExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: NotFoundExceptionFilter,
		},
	],
})
export class AppModule {}
