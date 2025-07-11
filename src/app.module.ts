import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CONFIG_OPTIONS, LOGGER_OPTIONS } from './options';
import { IndexModule } from './modules';
import { WinstonModule } from 'nest-winston';

@Module({
	imports: [
		ConfigModule.forRoot(CONFIG_OPTIONS),
		WinstonModule.forRootAsync(LOGGER_OPTIONS),
		IndexModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
