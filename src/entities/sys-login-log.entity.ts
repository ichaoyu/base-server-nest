import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ENTITY_LOGIN_STATUS } from '@/constants';

/**
 * 系统登录日志表
 */
@Entity({ name: 'sys_login_log' })
export class SysLoginLogEntity {
	/**
	 * 主键
	 */
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: string;

	/**
	 * 用户账号
	 */
	@Column({ name: 'user_name' })
	userName: string;

	/**
	 * 浏览器
	 */
	@Column({ name: 'browser' })
	browser: string;

	/**
	 * 操作系统
	 */
	@Column({ name: 'os' })
	os: string;

	/**
	 * 登录状态（0成功 1失败）
	 */
	@Column({ name: 'status', type: 'enum', enum: ENTITY_LOGIN_STATUS })
	status: ENTITY_LOGIN_STATUS;

	/**
	 * 提示消息
	 */
	@Column({ name: 'msg' })
	msg: string;

	/**
	 * 登录 IP
	 */
	@Column({ name: 'login_ip' })
	loginIp: string;

	/**
	 * 登录地点
	 */
	@Column({ name: 'login_location' })
	loginLocation: string;

	/**
	 * 登录时间
	 */
	@Column({ name: 'login_date' })
	loginDate: Date;
}
