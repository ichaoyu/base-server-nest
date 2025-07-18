import { SharedBullAsyncConfiguration } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

import { QUEUES } from '@/constants';

export const BULL_OPTIONS: SharedBullAsyncConfiguration = {
	useFactory(configService: ConfigService) {
		const options = configService.get('bull');
		if (!options) {
			throw new Error('Bull configuration not found');
		}
		return options;
	},
	inject: [ConfigService],
};

export const BULL_QUEUES = Object.values(QUEUES).map(v => ({ name: v }));
