/**
 * 在线信息接口
 */
export interface IOnlineInfo {
	/**
	 * 会话编号
	 */
	tokenId: string;
	/**
	 * 用户编号
	 */
	userId: string;
	/**
	 * 用户账号
	 */
	userName: string;
	/**
	 * 部门名称
	 */
	deptName: string;
	/**
	 * 登录IP
	 */
	loginIp: string;
	/**
	 * 登录地点
	 */
	loginLocation: string;
	/**
	 * 操作系统
	 */
	os: string;
	/**
	 * 浏览器
	 */
	browser: string;
	/**
	 * 登录时间
	 */
	loginDate: Date;
}
