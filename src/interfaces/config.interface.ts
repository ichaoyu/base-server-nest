import { BullRootModuleOptions } from '@nestjs/bull';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisClientOptions, RedisClusterOptions } from '@app/redis';
import { CaptchaOptions } from '@app/captcha';

export interface IConfig {
	/**
	 * 应用
	 */
	app: {
		// 端口号
		port: number;
		// 接口路径
		apiPath: string;
		// 文档路径
		docPath?: string;
		// 应用名称
		appName: string;
		// 队列路径
		queuePath: string;
		// 上传文件路径
		uploadFile: string;
	};
	/**
	 * JSON Web Token
	 */
	jwt?: JwtModuleOptions;
	/**
	 * 数据库
	 */
	typeorm?: TypeOrmModuleOptions;
	/**
	 * 缓存
	 */
	cache?: CacheModuleOptions<RedisClientOptions>;
	/**
	 * Redis
	 */
	redis?: RedisClientOptions | RedisClusterOptions;
	/**
	 * 验证码
	 */
	captcha?: CaptchaOptions;
	/**
	 * 队列
	 */
	bull?: BullRootModuleOptions;
}
