import { Reflector } from '@nestjs/core';

/**
 * 无鉴权装饰器
 */
export const Public = Reflector.createDecorator<boolean>({
  key: 'public:value',
  transform() {
    return true;
  },
});
