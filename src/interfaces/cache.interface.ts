import { Cache } from 'cache-manager';

export interface ICacheManager extends Cache {}

/**
 * 缓存模型接口
 */
export interface ICacheModel {
  /**
   * 缓存名称
   */
  cacheName: string;
  /**
   * 备注
   */
  remark: string;
}
