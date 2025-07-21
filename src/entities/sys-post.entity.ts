import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { ENTITY_STATUS } from '@/constants'

import { SysUserEntity } from '.'

/**
 * 系统岗位表
 */
@Entity({ name: 'sys_post' })
export class SysPostEntity {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: string

  /**
   * 岗位编码
   */
  @Column({ name: 'post_code' })
  postCode: string

  /**
   * 岗位名称
   */
  @Column({ name: 'post_name' })
  postName: string

  /**
   * 显示顺序
   */
  @Column({ name: 'post_sort' })
  postSort: number

  /**
   * 状态（0正常 1停用）
   */
  @Column({ name: 'status', type: 'enum', enum: ENTITY_STATUS })
  status: ENTITY_STATUS

  /**
   * 备注
   */
  @Column({ name: 'remark' })
  remark: string

  /**
   * 创建者
   */
  @Column({ name: 'create_by' })
  createBy: string

  /**
   * 创建时间
   */
  @CreateDateColumn({ name: 'create_time' })
  createTime: Date

  /**
   * 更新者
   */
  @Column({ name: 'update_by' })
  updateBy: string

  /**
   * 更新时间
   */
  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date

  /**
   * 关联用户表
   */
  @ManyToMany(() => SysUserEntity, user => user.posts)
  users: SysUserEntity[]
}
