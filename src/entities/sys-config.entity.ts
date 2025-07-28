import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ENTITY_CONFIG_TYPE } from '@/constants';

/**
 * 系统配置表
 */
@Entity({ name: 'sys_config' })
export class SysConfigEntity {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: string;

  /**
   * 参数名称
   */
  @Column({ name: 'config_name' })
  configName: string;

  /**
   * 参数键名
   */
  @Column({ name: 'config_key' })
  configKey: string;

  /**
   * 参数键值
   */
  @Column({ name: 'config_value' })
  configValue: string;

  /**
   * 系统内置（Y是 N否）
   */
  @Column({ name: 'config_type', type: 'enum', enum: ENTITY_CONFIG_TYPE })
  configType: ENTITY_CONFIG_TYPE;

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
}
