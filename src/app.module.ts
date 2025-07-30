import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService, ConditionalModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { CacheModule } from '@nestjs/cache-manager';

import { RedisModule, REDIS_CLIENT, REDIS_CLIENT_OPTIONS } from '@app/redis';
import { CaptchaModule } from '@app/captcha';
import { ExcelModule } from '@app/excel';
import { SharedModule, QueuesModule, EventsModule } from './shared';

import config, { LOGGER_OPTIONS } from './config';
import { ApiModule } from './apis';
import { ResponseInterceptor, CacheKeyInterceptor, OperLogInterceptor } from './interceptors';
import { ValidationPipe } from './pipes';
import { AuthGuard } from './guards';
import { DefaultExceptionFilter, NotFoundExceptionFilter, ValidationExceptionFilter } from './filters';
import { SysUtil } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    WinstonModule.forRootAsync(LOGGER_OPTIONS),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('typeorm'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        ...configService.get('jwt'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory(configService: ConfigService) {
        return configService.get('cache');
      },
      inject: [ConfigService],
    }),
    CaptchaModule.registerAsync({
      global: true,
      optionsProvider: {
        useFactory(configService: ConfigService) {
          return configService.get('captcha');
        },
        inject: [ConfigService],
      },
    }),
    ExcelModule.registerAsync({
      global: true,
    }),
    RedisModule.registerAsync({
      global: true,
      createType: 'client',
      clientToken: REDIS_CLIENT,
      optionsToken: REDIS_CLIENT_OPTIONS,
      optionsProvider: {
        useFactory: (configService: ConfigService) => configService.get('redis'),
        inject: [ConfigService],
      },
    }),
    ConditionalModule.registerWhen(EventsModule, () => !SysUtil.isTesting),
    QueuesModule.register(),
    SharedModule,
    ApiModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheKeyInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: OperLogInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DefaultExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule {}
