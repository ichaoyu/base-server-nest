import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysUserEntity } from './entities/demo.entity';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';

@Module({
	imports: [TypeOrmModule.forFeature([SysUserEntity])],
	controllers: [DemoController],
	providers: [DemoService],
})
export class DemoModule {}
