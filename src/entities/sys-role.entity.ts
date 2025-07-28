import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ENTITY_DEL_FLAG, ENTITY_STATUS } from '@/constants';

import { SysDeptEntity, SysMenuEntity, SysUserEntity } from '.';

/**
 * 系统角色表
 */
@Entity({ name: 'sys_role' })
export class SysRoleEntity {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: string;

  /**
   * 角色名称
   */
  @Column({ name: 'role_name' })
  roleName: string;

  /**
   * 角色权限字符串
   */
  @Column({ name: 'role_key' })
  roleKey: string;

  /**
   * 显示顺序
   */
  @Column({ name: 'role_sort' })
  roleSort: number;

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
   * 关联用户表
   */
  @ManyToMany(() => SysUserEntity, user => user.roles)
  users: SysUserEntity[];

  /**
   * 关联部门表
   */
  @ManyToMany(() => SysDeptEntity, dept => dept.roles)
  @JoinTable({
    name: 'sys_role_dept',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'dept_id' },
  })
  depts: SysDeptEntity[];

  /**
   * 关联菜单表
   */
  @ManyToMany(() => SysMenuEntity, menu => menu.roles)
  @JoinTable({
    name: 'sys_role_menu',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'menu_id' },
  })
  menus: SysMenuEntity[];
}
