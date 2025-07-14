import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sys_user' })
export class SysUserEntity {
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
	 * 用户昵称
	 */
	@Column({ name: 'nick_name' })
	nickName: string;
}
