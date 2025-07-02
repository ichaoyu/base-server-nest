import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);
	const configService = app.get(ConfigService);
	const appConfig = configService.get('app');
	app.setGlobalPrefix(appConfig.apiPath);

	const logger = new Logger();
	/**
	 * 默认情况下，Fastify 仅监听 localhost 127.0.0.1 接口。只有配置了 0.0.0.0 才能用本机 ip 访问
	 */
	const ADDRESS = '0.0.0.0';
	const PORT = appConfig.port;
	const DOC_PATH = appConfig.docPath;
	const DOC_FILE = `${DOC_PATH}-json`;
	const LOGGER_CONTEXT = 'BaseServerNest';
	if (DOC_PATH) {
		const config = new DocumentBuilder()
			.setTitle('BaseServerNest API')
			.setDescription('BaseServerNest API 模板接口文档')
			.setVersion('1.0')
			.addBearerAuth()
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup(DOC_PATH, app, document);
	}
	await app.listen(PORT, ADDRESS, (err, address) => {
		const ADDR = address.replace(ADDRESS, '127.0.0.1');
		logger.log(`应用接口地址 ${ADDR}`, LOGGER_CONTEXT);
		if (DOC_PATH) {
			logger.log(`接口文档地址 ${ADDR}${DOC_PATH}`, LOGGER_CONTEXT);
			logger.log(`接口文档数据 ${ADDR}${DOC_FILE}`, LOGGER_CONTEXT);
		}
	});
}
bootstrap();
