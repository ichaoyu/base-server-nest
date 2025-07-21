import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { ENTITY_IS_DEFAULT, ENTITY_STATUS } from '@/constants'

/**
 * 系统字典数据表
 */
@Entity({ name: 'sys_dict_data' })
export class SysDictDataEntity {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: string

  /**
   * 显示顺序
   */
  @Column({ name: 'dict_sort' })
  dictSort: number

  /**
   * 字典标签
   */
  @Column({ name: 'dict_label' })
  dictLabel: string

  /**
   * 字典键值
   */
  @Column({ name: 'dict_value' })
  dictValue: string

  /**
   * 字典类型
   */
  @Column({ name: 'dict_type' })
  dictType: string

  /**
   * 是否默认（Y是 N否）
   */
  @Column({ name: 'is_default', type: 'enum', enum: ENTITY_IS_DEFAULT })
  isDefault: ENTITY_IS_DEFAULT

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
