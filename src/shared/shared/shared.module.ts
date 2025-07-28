import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DemoEntity,
  SysConfigEntity,
  SysDeptEntity,
  SysDictDataEntity,
  SysDictTypeEntity,
  SysLoginLogEntity,
  SysMenuEntity,
  SysOperLogEntity,
  SysPostEntity,
  SysRoleEntity,
  SysUserEntity,
} from '@/entities';
import { ContextService } from './context.service';
import { SharedService } from './shared.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      DemoEntity,
      SysConfigEntity,
      SysDeptEntity,
      SysDictDataEntity,
      SysDictTypeEntity,
      SysLoginLogEntity,
      SysMenuEntity,
      SysOperLogEntity,
      SysPostEntity,
      SysRoleEntity,
      SysUserEntity,
    ]),
  ],
  providers: [SharedService, ContextService],
  exports: [TypeOrmModule, SharedService, ContextService],
})
export class SharedModule {}
