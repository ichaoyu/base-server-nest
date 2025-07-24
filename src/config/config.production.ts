import { registerAs } from '@nestjs/config';
import KeyvRedis, { Keyv } from '@keyv/redis';

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
			stores: [
				new Keyv({
					store: new KeyvRedis({
						url: `redis://${redisOptions.host}:${redisOptions.port}/${redisOptions.db}`,
					}),
					namespace: '{' + BASE.APP_NAME + '}:{cache}:',
					useKeyPrefix: false, // 去掉重复的namespace
				}),
			],
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
		jwt: {
			secret: 'This$a1$veRy*SEcrEt$s0sEcReT&kEy',
			signOptions: {
				expiresIn: 604800000, // 7 days
			},
		},
	};
});
