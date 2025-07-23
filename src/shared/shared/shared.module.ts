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
	providers: [],
	exports: [TypeOrmModule],
})
export class SharedModule {}
