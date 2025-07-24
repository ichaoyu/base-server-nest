import { Module } from '@nestjs/common';

import { DemoModule } from './demo/demo.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [AuthModule, DemoModule],
})
export class ApiModule {}
