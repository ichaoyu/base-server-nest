import { CACHES } from '@/constants';

/**
 * 缓存工具
 */
export const CacheUtil = {
	/**
	 * 通用的键生成函数
	 * @param {string} baseKey 基础键名
	 * @param {string} identifier 标识符
	 * @returns {string} 完整的缓存键
	 */
	generateKey: (baseKey: string, identifier: string) => {
		// 验证输入参数是否为字符串
		if (typeof baseKey !== 'string' || typeof identifier !== 'string') {
			throw new Error('Base key and identifier must be strings');
		}
		return `${baseKey}${identifier}`; // 使用模板字符串拼接
	},
	/**
	 * 获取会话标识
	 * @param {string} tokenId 会话编号
	 */
	getTokenKey: (tokenId: string) =>
		CacheUtil.generateKey(CACHES.LOGIN_TOKEN_KEY, tokenId),
	/**
	 * 获取用户标识
	 * @param {string} userId 用户编号
	 */
	getUserKey: (userId: string) =>
		CacheUtil.generateKey(CACHES.LOGIN_USER_KEY, userId),
	/**
	 * 获取字典标识
	 * @param {string} dictType 字典类型
	 */
	getDictKey: (dictType: string) =>
		CacheUtil.generateKey(CACHES.SYS_DICT_KEY, dictType),
	/**
	 * 获取配置标识
	 * @param {string} key 配置键名
	 */
	getConfigKey: (key: string) =>
		CacheUtil.generateKey(CACHES.SYS_CONFIG_KEY, key),
};
