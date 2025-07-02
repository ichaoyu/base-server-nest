import { Module } from '@nestjs/common';
import { DemoApiService } from './demo-api.service';
import { DemoApiController } from './demo-api.controller';

@Module({
	controllers: [DemoApiController],
	providers: [DemoApiService],
})
export class DemoApiModule {}
