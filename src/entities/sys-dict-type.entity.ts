import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { ENTITY_STATUS } from '@/constants'

/**
 * 系统字典类型表
 */
@Entity({ name: 'sys_dict_type' })
export class SysDictTypeEntity {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: string

  /**
   * 字典名称
   */
  @Column({ name: 'dict_name' })
  dictName: string

  /**
   * 字典类型
   */
  @Column({ name: 'dict_type', unique: true })
  dictType: string

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
}
