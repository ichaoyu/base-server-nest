import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { ENTITY_DEL_FLAG, ENTITY_SEX, ENTITY_STATUS } from '@/constants';

import { SysDeptEntity, SysPostEntity, SysRoleEntity } from '.';

/**
 * 系统用户表
 */
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

	/**
	 * 用户邮箱
	 */
	@Column({ name: 'email' })
	email: string;

	/**
	 * 手机号码
	 */
	@Column({ name: 'phone' })
	phone: string;

	/**
	 * 用户性别（0男 1女 2未知）
	 */
	@Column({ name: 'sex', type: 'enum', enum: ENTITY_SEX })
	sex: ENTITY_SEX;

	/**
	 * 头像地址
	 */
	@Column({ name: 'avatar' })
	avatar: string;

	/**
	 * 用户密码
	 */
	@Column({ name: 'password', select: false })
	password: string;

	/**
	 * 状态（0正常 1停用）
	 */
	@Column({ name: 'status', type: 'enum', enum: ENTITY_STATUS })
	status: ENTITY_STATUS;

	/**
	 * 删除标志（0存在 2删除）
	 */
	@Column({ name: 'del_flag', type: 'enum', enum: ENTITY_DEL_FLAG })
	delFlag: ENTITY_DEL_FLAG;

	/**
	 * 最后登录 IP
	 */
	@Column({ name: 'login_ip' })
	loginIp: string;

	/**
	 * 最后登录时间
	 */
	@Column({ name: 'login_date' })
	loginDate: Date;

	/**
	 * 备注
	 */
	@Column({ name: 'remark' })
	remark: string;

	/**
	 * 创建者
	 */
	@Column({ name: 'create_by' })
	createBy: string;

	/**
	 * 创建时间
	 */
	@CreateDateColumn({ name: 'create_time' })
	createTime: Date;

	/**
	 * 更新者
	 */
	@Column({ name: 'update_by' })
	updateBy: string;

	/**
	 * 更新时间
	 */
	@UpdateDateColumn({ name: 'update_time' })
	updateTime: Date;

	/**
	 * 关联部门表
	 */
	@OneToOne(() => SysDeptEntity)
	@JoinColumn({ name: 'dept_id' })
	dept: SysDeptEntity;

	/**
	 * 关联角色表
	 */
	@ManyToMany(() => SysRoleEntity, role => role.users)
	@JoinTable({
		name: 'sys_user_role',
		joinColumn: { name: 'user_id' },
		inverseJoinColumn: { name: 'role_id' },
	})
	roles: SysRoleEntity[];

	/**
	 * 关联岗位表
	 */
	@ManyToMany(() => SysPostEntity, post => post.users)
	@JoinTable({
		name: 'sys_user_post',
		joinColumn: { name: 'user_id' },
		inverseJoinColumn: { name: 'post_id' },
	})
	posts: SysPostEntity[];
}
