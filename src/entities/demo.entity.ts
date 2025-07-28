import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'demo' })
export class DemoEntity {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: string;

  /**
   * 测试name
   */
  @Column({ name: 'name' })
  userName: string;

  /**
   * 测试年龄
   */
  @Column({ name: 'age' })
  age: number;

  /**
   * 测试备注
   */
  @Column({ name: 'remark' })
  remark: string;
}
