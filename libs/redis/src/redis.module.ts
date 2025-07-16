import { DynamicModule, Inject, Module, OnModuleDestroy } from '@nestjs/common';

import {
	RedisClient,
	RedisCluster,
	RedisModuleOptions,
} from './redis.interface';
import { createFactory, createRedisCommonOptions } from './redis.providers';

export class RedisModule {
	static registerAsync(params: RedisModuleOptions) {
		const { global, createType, clientToken, optionsToken, optionsProvider } =
			params;

		@Module({})
		class RedisCoreModule implements OnModuleDestroy {
			constructor(
				@Inject(clientToken)
				private readonly client: RedisClient | RedisCluster,
			) {}

			static create(): DynamicModule {
				return {
					module: RedisCoreModule,
					global,
					providers: [
						createRedisCommonOptions(optionsToken, optionsProvider),
						createFactory(createType)(clientToken, optionsToken),
					],
					exports: [clientToken],
				};
			}

			async onModuleDestroy() {
				await this.client.quit();
			}
		}

		return RedisCoreModule.create();
	}
}
