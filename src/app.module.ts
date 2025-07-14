import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import { CONFIG_OPTIONS, LOGGER_OPTIONS, TYPEORM_OPTIONS } from './options';
import { IndexModule } from './modules';

@Module({
	imports: [
		ConfigModule.forRoot(CONFIG_OPTIONS),
		WinstonModule.forRootAsync(LOGGER_OPTIONS),
		TypeOrmModule.forRootAsync(TYPEORM_OPTIONS),
		IndexModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
