import { Reflector } from '@nestjs/core';

import { ENTITY_BIZ_TYPE } from '@/constants';

interface OperLogOptions {
	/**
	 * 操作模块
	 */
	title: string;
	/**
	 * 业务类型
	 */
	bizType: ENTITY_BIZ_TYPE;
}

/**
 * 操作日志装饰器
 */
export const OperLog = Reflector.createDecorator<OperLogOptions>({
	key: 'operLog:value',
});
