/**
 * 缓存键名
 */
export enum CACHES {
	/**
	 * 登录会话
	 */
	LOGIN_TOKEN_KEY = 'login_tokens:',
	/**
	 * 登录用户
	 */
	LOGIN_USER_KEY = 'login_users:',
	/**
	 * 参数配置
	 */
	SYS_CONFIG_KEY = 'sys_config:',
	/**
	 * 字典管理
	 */
	SYS_DICT_KEY = 'sys_dict:',
}
