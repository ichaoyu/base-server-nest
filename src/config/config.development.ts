import { registerAs } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

import { BASE } from '@/constants';

export default registerAs('', () => {
	// redis连接配置
	const redisOptions = {
		host: '127.0.0.1',
		port: 6379,
		db: 0,
	};

	return {
		app: {
			port: 3000,
			apiPath: '/api',
			docPath: '/swagger-ui',
			appName: BASE.APP_NAME,
			queuePath: '/queues',
		},
		typeorm: {
			type: 'mysql',
			host: '127.0.0.1',
			port: 3306,
			username: 'root',
			password: '1qazxsw2',
			database: 'base-nest-service',
			keepConnectionAlive: true,
			timezone: '+08:00',
			autoLoadEntities: true,
		},
		cache: {
			store: redisStore,
			keyPrefix: '{' + BASE.APP_NAME + '}:{cache}:',
			...redisOptions,
		},
		redis: {
			keyPrefix: '{' + BASE.APP_NAME + '}:{redis}:',
			...redisOptions,
		},
		bull: {
			redis: {
				keyPrefix: '{' + BASE.APP_NAME + '}:{bull}',
				...redisOptions,
			},
		},
	};
});
