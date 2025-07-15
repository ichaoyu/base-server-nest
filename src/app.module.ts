import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import config from './config';
import { LOGGER_OPTIONS } from './utils';
import { CommonModule } from './apis/common';
import { ApiModule } from './apis';

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
		CommonModule,
		ApiModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
