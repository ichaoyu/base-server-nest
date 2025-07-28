import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';

import { BASE, MESSAGES } from '@/constants';
import { SysConfigEntity, SysLoginLogEntity, SysOperLogEntity, SysUserEntity } from '@/entities';

import { IPayload, IPlatform } from '@/interfaces';

/**
 * 共享服务
 */
@Injectable()
export class SharedService {
  constructor(
    @InjectRepository(SysUserEntity)
    private readonly userModel: Repository<SysUserEntity>,
    @InjectRepository(SysLoginLogEntity)
    private readonly loginLogModel: Repository<SysLoginLogEntity>,
    @InjectRepository(SysOperLogEntity)
    private readonly operLogModel: Repository<SysOperLogEntity>,
    @InjectRepository(SysConfigEntity)
    private readonly configModel: Repository<SysConfigEntity>,
  ) {}

  /**
   * 保存登录日志
   * @param {SysLoginLogEntity} data 登录日志数据
   */
  async setLoginLog(data: SysLoginLogEntity) {
    await this.loginLogModel.insert(data);
  }

  /**
   * 保存操作日志
   * @param {SysOperLogEntity} data 操作日志数据
   */
  async setOperLog(data: SysOperLogEntity) {
    await this.operLogModel.insert(data);
  }

  /**
   * 单客户端登录判断
   */
  async isSoloLogin() {
    const config = await this.configModel.findOneBy({
      configKey: 'sys.base.soloLogin',
    });

    return config?.configValue === '0';
  }

  /**
   * 获取用户部门
   * @param {string} userName 用户名
   */
  async getUserWithDeptByName(userName: string) {
    return await this.userModel.findOne({
      relations: { dept: true },
      where: { userName },
    });
  }

  /**
   * 从 JWT 载荷获取用户带部门和角色
   * @param {IPayload} payload JWT 载荷
   * @param {IPlatform} platform 平台
   */
  async getUserWithDeptRolesByPayload(payload: IPayload, platform: IPlatform = 'http') {
    const user = await this.userModel.findOne({
      relations: {
        dept: true,
        roles: {
          menus: true,
        },
      },
      where: { id: payload.userId, userName: payload.userName },
    });

    if (!user) {
      throw platform === 'http'
        ? new UnauthorizedException(MESSAGES.AUTHORIZATION_NOT_VALID)
        : new WsException({
            status: HttpStatus.UNAUTHORIZED,
            message: MESSAGES.AUTHORIZATION_NOT_VALID,
          });
    }

    return user;
  }

  /**
   * 获取用户带权限
   * @param {SysUserEntity} data 用户
   */
  getUserWithPermission(data: SysUserEntity) {
    const { roles, ...rest } = data;

    const user = {
      permissions: [] as string[],
      user: rest,
    };

    if (roles?.length) {
      if (rest.id === '1') {
        // 主账号拥有全部权限
        user.permissions = [BASE.ADMIN_PERMISSION];
      } else {
        const permissions = new Set<string>();

        for (const role of roles) {
          if (role.menus?.length) {
            for (const menu of role.menus) {
              permissions.add(menu.perms);
            }
          }
        }

        user.permissions = Array.from(permissions);
      }
    }

    return {
      ...user,
      roles,
    };
  }
}
