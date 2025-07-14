import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const TYPEORM_OPTIONS: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	useFactory: (configService: ConfigService) => {
		return { ...configService.get('typeorm') };
	},
	inject: [ConfigService],
};
