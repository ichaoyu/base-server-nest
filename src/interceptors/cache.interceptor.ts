import { CACHE_KEY_METADATA, CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

import { CACHES } from '@/constants';
import { CacheUtil } from '@/utils';

/**
 * 缓存键名拦截器
 */
@Injectable()
export class CacheKeyInterceptor extends CacheInterceptor {
	trackBy(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const cacheKey = this.reflector.get(
			CACHE_KEY_METADATA,
			context.getHandler(),
		);

		if (!cacheKey) {
			return '';
		}

		// 定义缓存键处理映射表
		const keyHandlers: { [key: string]: (query: any) => string } = {
			[CACHES.SYS_CONFIG_KEY]: query => CacheUtil.getConfigKey(query.key),
			[CACHES.SYS_DICT_KEY]: query => CacheUtil.getDictKey(query.dictType),
		};

		// 获取对应的处理函数并执行，若不存在则返回原始 cacheKey
		const handler = keyHandlers[cacheKey];
		return handler ? handler(request.query) : cacheKey;
	}
}
