import { Reflector } from '@nestjs/core';

/**
 * 权限装饰器
 */
export const Permission = Reflector.createDecorator<string>({
  key: 'permission:value',
});
