import { registerAs } from '@nestjs/config';

export default registerAs('', () => {
	return {
		app: {
			port: 3000,
			apiPath: '/api',
		},
	};
});
