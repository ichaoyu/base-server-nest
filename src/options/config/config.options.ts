import { ConfigModuleOptions } from '@nestjs/config';
import config from '@/config';

export const CONFIG_OPTIONS: ConfigModuleOptions = {
	load: [config],
	isGlobal: true,
};
