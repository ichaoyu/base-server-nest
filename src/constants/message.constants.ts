/**
 * 消息
 */
export enum MESSAGES {
	/**
	 * 用户已存在
	 */
	USER_EXIST = '用户已存在',
	/**
	 * 用户不存在
	 */
	USER_NOT_EXIST = '用户不存在',
	/**
	 * 登录凭证不存在
	 */
	AUTHORIZATION_NOT_EXIST = '登录凭证不存在',
	/**
	 * 登录凭证不正确
	 */
	AUTHORIZATION_NOT_CORRECT = '登录凭证不正确',
	/**
	 * 登录凭证已过期
	 */
	AUTHORIZATION_EXPIRED = '登录凭证已过期',
	/**
	 * 登录凭证不可用
	 */
	AUTHORIZATION_NOT_VALID = '登录凭证不可用',
	/**
	 * 验证码不正确
	 */
	CAPTCHA_NOT_CORRECT = '验证码不正确',
	/**
	 * 登录成功
	 */
	LOGIN_SUCCESS = '登录成功',
	/**
	 * 用户账号或密码错误
	 */
	ACCOUNT_OR_PASSWORD_ERROR = '用户账号或密码错误',
	/**
	 * 请求成功
	 */
	REQUEST_OK = '请求成功',
	/**
	 * 校验参数错误
	 */
	UNPROCESSABLE_ENTITY = '校验参数错误',
	/**
	 * 无权访问
	 */
	NO_ACCESS = '无权访问',
	/**
	 * 内部服务器错误
	 */
	INTERNAL_SERVER_ERROR = '服务器错误',
	/**
	 * 参数配置已存在
	 */
	CONFIG_EXIST = '参数配置已存在',
	/**
	 * 参数配置不存在
	 */
	CONFIG_NOT_EXIST = '参数配置不存在',
	/**
	 * 部门不存在
	 */
	DEPT_NOT_EXIST = '部门不存在',
	/**
	 * 上级部门不存在
	 */
	PARENT_DEPT_NOT_EXIST = '上级部门不存在',
	/**
	 * 字典类型已存在
	 */
	DICT_TYPE_EXIST = '字典类型已存在',
	/**
	 * 字典类型不存在
	 */
	DICT_TYPE_NOT_EXIST = '字典类型不存在',
	/**
	 * 字典数据已存在
	 */
	DICT_DATA_EXIST = '字典数据已存在',
	/**
	 * 字典数据不存在
	 */
	DICT_DATA_NOT_EXIST = '字典数据不存在',
	/**
	 * 菜单不存在
	 */
	MENU_NOT_EXIST = '菜单不存在',
	/**
	 * 岗位不存在
	 */
	POST_NOT_EXIST = '岗位不存在',
	/**
	 * 角色不存在
	 */
	ROLE_NOT_EXIST = '角色不存在',
	/**
	 * 密码不相等
	 */
	PASSWORD_NOT_EQUAL = '密码不相等',
	/**
	 * 资源不存在
	 */
	NOT_FOUND = '资源不存在',
	/**
	 * 基础鉴权不正确
	 */
	BASIC_AUTH_NOT_CORRECT = '基础鉴权不正确',

	/**
	 * 无法创建上传目录，请检查权限设置
	 */
	CANNOT_CREATE_UPLOAD_DIR = '无法创建上传目录，请检查权限设置',
	/**
	 * 文件上传失败
	 */
	FILE_UPLOAD_FAILED = '文件上传失败',

	/**
	 * 获取默认网络信息失败
	 */
	GET_DEFAULT_NETWORK_FAILED = '获取默认网络信息失败',
}
