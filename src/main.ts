import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, LoggerService } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyMultipart from '@fastify/multipart';
import fastifyCsrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import fastifyBasicAuth from '@fastify/basic-auth';
import { isEqual } from 'lodash-unified';

import { AppModule } from './app.module';
import { MESSAGES, BASE } from '@/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);
  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  const { port, apiPath, docPath, queuePath, appName } = configService.get('app');

  // 允许跨域
  app.enableCors();
  // CSRF 防护
  await app.register(fastifyCsrf);
  // helmet 防护
  await app.register(helmet);
  app.setGlobalPrefix(apiPath);
  app.useLogger(logger);
  // 上传
  await app.register(fastifyMultipart);

  const basicAuth = configService.get('basicAuth');
  await app.register(fastifyBasicAuth, {
    authenticate: true,
    validate: (username, password, req, res, done) => {
      if (isEqual({ username, password }, basicAuth)) {
        done();
      } else {
        done(new Error());
      }
    },
  });

  const instance = app.getHttpAdapter().getInstance();
  instance.addHook('onRequest', (req, res, done) => {
    // 对匹配的路径做鉴权
    if ([docPath, queuePath].includes(req.originalUrl)) {
      instance.basicAuth(req, res, err => {
        if (!err) {
          return done;
        }
        res.code(HttpStatus.UNAUTHORIZED).send({
          status: HttpStatus.UNAUTHORIZED,
          message: MESSAGES.BASIC_AUTH_NOT_CORRECT,
        });
      });
    } else {
      done();
    }
  });

  /**
   * 默认情况下，Fastify 仅监听 localhost 127.0.0.1 接口。只有配置了 0.0.0.0 才能用本机 ip 访问
   */
  const ADDRESS = '0.0.0.0';
  const DOC_FILE = `${docPath}-json`;
  const LOCAL_IP = BASE.LOCAL_IP;
  if (docPath) {
    const config = new DocumentBuilder()
      .setTitle(`${appName} API`)
      .setDescription(`${appName} API 接口文档`)
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(docPath, app, document);
  }
  await app.listen(port, ADDRESS, (err, address) => {
    if (err) {
      logger.error(`启动失败: ${err}`, appName);
      return;
    }
    const ADDR = address.replace(ADDRESS, LOCAL_IP);
    logger.log(`应用接口地址 ${ADDR}`, appName);
    logger.log(`应用任务队列 ${ADDR}${queuePath}`, appName);
    if (docPath) {
      logger.log(`接口文档地址 ${ADDR}${docPath}`, appName);
      logger.log(`接口文档数据 ${ADDR}${DOC_FILE}`, appName);
    }
  });
}
bootstrap();
