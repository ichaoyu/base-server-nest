import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { ENTITY_DEL_FLAG, ENTITY_STATUS } from '@/constants';

import { SysRoleEntity } from '.';

/**
 * 系统部门表
 */
@Entity({ name: 'sys_dept' })
export class SysDeptEntity {
	/**
	 * 主键
	 */
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: string;

	/**
	 * 上级主键
	 */
	@Column({ name: 'parent_id', type: 'bigint' })
	parentId: string;

	/**
	 * 祖级列表
	 */
	@Column({ name: 'ancestors' })
	ancestors: string;

	/**
	 * 部门名称
	 */
	@Column({ name: 'dept_name' })
	deptName: string;

	/**
	 * 显示顺序
	 */
	@Column({ name: 'order_num' })
	orderNum: number;

	/**
	 * 负责人
	 */
	@Column({ name: 'leader' })
	leader: string;

	/**
	 * 联系电话
	 */
	@Column({ name: 'phone' })
	phone: string;

	/**
	 * 邮箱
	 */
	@Column({ name: 'email' })
	email: string;

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
	 * 角色关联表
	 */
	@ManyToMany(() => SysRoleEntity, role => role.depts)
	roles: SysRoleEntity[];
}
