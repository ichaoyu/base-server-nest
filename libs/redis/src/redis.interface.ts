import {
	ClassProvider,
	FactoryProvider,
	InjectionToken,
	ValueProvider,
} from '@nestjs/common';
import {
	Cluster,
	ClusterNode,
	ClusterOptions,
	Redis,
	RedisOptions,
} from 'ioredis';

export {
	Redis as RedisClient,
	RedisOptions as RedisClientOptions,
	Cluster as RedisCluster,
};

export type OptionsProviderRedis =
	| Omit<ValueProvider, 'provide'>
	| Omit<ClassProvider, 'provide'>
	| Omit<FactoryProvider, 'provide'>;

export interface RedisClusterOptions {
	nodes: ClusterNode[];
	options: ClusterOptions;
}

export type CreateType = 'client' | 'cluster';

export interface RedisModuleOptions {
	createType: CreateType;
	clientToken: InjectionToken;
	optionsToken: InjectionToken;
	optionsProvider: OptionsProviderRedis;
	global?: boolean;
}
