import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoEntity } from '@/entities';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([DemoEntity])],
	providers: [],
	exports: [TypeOrmModule],
})
export class CommonModule {}
