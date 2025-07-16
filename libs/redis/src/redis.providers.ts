import { InjectionToken, Provider } from '@nestjs/common';

import {
	CreateType,
	OptionsProviderRedis,
	RedisClient,
	RedisClientOptions,
	RedisCluster,
	RedisClusterOptions,
} from './redis.interface';

// 定义支持的类型，确保类型安全
const SUPPORTED_TYPES: CreateType[] = ['client', 'cluster'];

/**
 * 创建通用的Redis客户端Provider
 * @param type 客户端类型，必须是'supported types'之一
 * @returns Provider对象
 */
export function createFactory(type: CreateType) {
	if (!SUPPORTED_TYPES.includes(type)) {
		throw new Error(`Unsupported Redis type: ${type}`); // 添加错误处理
	}
	const factory = {
		client: createRedisClient,
		cluster: createRedisCluster,
	};

	return factory[type];
}

/**
 * 创建Redis客户端的Provider
 * @param clientToken 客户端的InjectionToken
 * @param optionsToken 配置选项的InjectionToken
 * @returns Provider对象
 */
export function createRedisClient(
	clientToken: InjectionToken,
	optionsToken: InjectionToken,
): Provider {
	return {
		provide: clientToken,
		useFactory: (options: RedisClientOptions) => {
			return new RedisClient(options); // 创建RedisClient实例
		},
		inject: [optionsToken], // 注入配置选项
	};
}

/**
 * 创建Redis集群的Provider
 * @param clusterToken 集群的InjectionToken
 * @param optionsToken 配置选项的InjectionToken
 * @returns Provider对象
 */
export function createRedisCluster(
	clusterToken: InjectionToken,
	optionsToken: InjectionToken,
): Provider {
	return {
		provide: clusterToken,
		useFactory: (options: RedisClusterOptions) => {
			return new RedisCluster(options.nodes, options.options); // 创建RedisCluster实例
		},
		inject: [optionsToken], // 注入配置选项
	};
}

/**
 * 创建Redis通用配置选项的Provider
 * @param optionsToken 配置选项的InjectionToken
 * @param provider 配置提供者
 * @returns Provider对象
 */
export function createRedisCommonOptions(
	optionsToken: InjectionToken,
	provider: OptionsProviderRedis,
): Provider {
	return {
		provide: optionsToken,
		...provider,
	};
}
