import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ENTITY_IS_CACHE, ENTITY_IS_FRAME, ENTITY_MENU_TYPE, ENTITY_STATUS, ENTITY_VISIBLE } from '@/constants';

import { SysRoleEntity } from '.';

/**
 * 系统菜单表
 */
@Entity({ name: 'sys_menu' })
export class SysMenuEntity {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: string;

  /**
   * 菜单名称
   */
  @Column({ name: 'menu_name' })
  menuName: string;

  /**
   * 上级主键
   */
  @Column({ name: 'parent_id', type: 'bigint' })
  parentId: string;

  /**
   * 显示顺序
   */
  @Column({ name: 'order_num' })
  orderNum: number;

  /**
   * 路由地址
   */
  @Column({ name: 'path' })
  path: string;

  /**
   * 组件路径
   */
  @Column({ name: 'component' })
  component: string;

  /**
   * 路由重定向地址
   */
  @Column({ name: 'redirect' })
  redirect: string;

  /**
   * 是否为外链（0是 1否）
   */
  @Column({ name: 'is_frame', type: 'enum', enum: ENTITY_IS_FRAME })
  isFrame: ENTITY_IS_FRAME;

  /**
   * 是否缓存（0缓存 1不缓存）
   */
  @Column({ name: 'is_cache', type: 'enum', enum: ENTITY_IS_CACHE })
  isCache: ENTITY_IS_CACHE;

  /**
   * 菜单类型（M目录 C菜单 F按钮）
   */
  @Column({ name: 'menu_type', type: 'enum', enum: ENTITY_MENU_TYPE })
  menuType: ENTITY_MENU_TYPE;

  /**
   * 是否可见（0显示 1隐藏）
   */
  @Column({ name: 'visible', type: 'enum', enum: ENTITY_VISIBLE })
  visible: ENTITY_VISIBLE;

  /**
   * 状态（0正常 1停用）
   */
  @Column({ name: 'status', type: 'enum', enum: ENTITY_STATUS })
  status: ENTITY_STATUS;

  /**
   * 权限标识
   */
  @Column({ name: 'perms' })
  perms: string;

  /**
   * 菜单图标
   */
  @Column({ name: 'icon' })
  icon: string;

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
   * 关联角色表
   */
  @ManyToMany(() => SysRoleEntity, role => role.menus)
  roles: SysRoleEntity[];
}
