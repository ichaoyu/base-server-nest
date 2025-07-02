import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoApiModule } from './demo-api/demo-api.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		DemoApiModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
