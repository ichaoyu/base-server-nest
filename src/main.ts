import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	const configService = app.get(ConfigService);
	const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
	const { port, apiPath, docPath } = configService.get('app');

	app.setGlobalPrefix(apiPath);
	app.useLogger(logger);
	/**
	 * 默认情况下，Fastify 仅监听 localhost 127.0.0.1 接口。只有配置了 0.0.0.0 才能用本机 ip 访问
	 */
	const ADDRESS = '0.0.0.0';
	const DOC_FILE = `${docPath}-json`;
	const LOGGER_CONTEXT = 'BaseServerNest';
	if (docPath) {
		const config = new DocumentBuilder()
			.setTitle('BaseServerNest API')
			.setDescription('BaseServerNest API 接口文档')
			.setVersion('1.0')
			.addBearerAuth()
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup(docPath, app, document);
	}
	await app.listen(port, ADDRESS, (err, address) => {
		if (err) {
			logger.error(`启动失败: ${err}`, LOGGER_CONTEXT);
			return;
		}
		const ADDR = address.replace(ADDRESS, '127.0.0.1');
		logger.log(`应用接口地址 ${ADDR}`, LOGGER_CONTEXT);
		if (docPath) {
			logger.log(`接口文档地址 ${ADDR}${docPath}`, LOGGER_CONTEXT);
			logger.log(`接口文档数据 ${ADDR}${DOC_FILE}`, LOGGER_CONTEXT);
		}
	});
}
bootstrap();
