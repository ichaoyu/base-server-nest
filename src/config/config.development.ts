import { registerAs } from '@nestjs/config';

export default registerAs('', () => {
	return {
		app: {
			port: 3000,
			apiPath: '/api',
			docPath: '/swagger-ui',
			appName: 'BaseServerNest',
		},
		typeorm: {
			type: 'mysql',
			host: '127.0.0.1',
			port: 3306,
			username: 'root',
			password: '1qazxsw2',
			database: 'nest-service',
			autoLoadEntities: true,
		},
	};
});
