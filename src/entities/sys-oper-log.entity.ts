import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { ENTITY_BIZ_STATUS, ENTITY_BIZ_TYPE } from '@/constants'

/**
 * 系统操作日志表
 */
@Entity({ name: 'sys_oper_log' })
export class SysOperLogEntity {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: string

  /**
   * 操作模块
   */
  @Column({ name: 'title' })
  title: string

  /**
   * 业务类型
   */
  @Column({ name: 'biz_type', type: 'enum', enum: ENTITY_BIZ_TYPE })
  bizType: ENTITY_BIZ_TYPE

  /**
   * 请求方法
   */
  @Column({ name: 'method' })
  method: string

  /**
   * 请求方式
   */
  @Column({ name: 'request_method' })
  requestMethod: string

  /**
   * 请求地址
   */
  @Column({ name: 'request_url' })
  requestUrl: string

  /**
   * 请求参数
   */
  @Column({ name: 'request_params' })
  requestParams: string

  /**
   * 请求结果
   */
  @Column({ name: 'request_result' })
  requestResult: string

  /**
   * 操作人员
   */
  @Column({ name: 'oper_name' })
  operName: string

  /**
   * 部门名称
   */
  @Column({ name: 'dept_name' })
  deptName: string

  /**
   * 操作地址
   */
  @Column({ name: 'oper_ip' })
  operIp: string

  /**
   * 操作地点
   */
  @Column({ name: 'oper_location' })
  operLocation: string

  /**
   * 操作状态
   */
  @Column({ name: 'status', type: 'enum', enum: ENTITY_BIZ_STATUS })
  status: ENTITY_BIZ_STATUS

  /**
   * 错误消息
   */
  @Column({ name: 'error_msg' })
  errorMsg: string

  /**
   * 操作时间
   */
  @Column({ name: 'oper_time' })
  operTime: Date

  /**
   * 消耗时间
   */
  @Column({ name: 'cost_time' })
  costTime: number
}
