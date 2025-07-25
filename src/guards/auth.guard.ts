import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { BASE, MESSAGES } from '@/constants';
import { Permission, Public } from '@/decorators';
import { ICacheManager, IRequest } from '@/interfaces';
import { ContextService } from '@/shared';
import { CacheUtil } from '@/utils';

/**
 * 登录守卫
 */
@Injectable({
  scope: Scope.REQUEST,
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: ICacheManager,
    private configService: ConfigService,
    private contextService: ContextService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<IRequest>();
    const apiPath = this.configService.get('app.apiPath');
    const permission = this.reflector.get(Permission, context.getHandler());

    const isApi = request.url.includes(apiPath);
    const isPublic = this.reflector.getAllAndOverride(Public, [context.getHandler(), context.getClass()]);

    // 匹配路径
    if (!isApi || isPublic) {
      return true;
    }

    // 请求头没有登录凭证
    if (!request.headers.authorization) {
      throw new UnauthorizedException(MESSAGES.AUTHORIZATION_NOT_EXIST);
    }

    const parts = request.headers.authorization.trim().split(' ');

    // 请求头没有登录凭证
    if (parts.length !== 2) {
      throw new UnauthorizedException(MESSAGES.AUTHORIZATION_NOT_EXIST);
    }

    const [scheme, token] = parts;

    if (/^Bearer$/i.test(scheme)) {
      try {
        const res = await this.jwtService.verify(token, {
          complete: true,
        });

        if (typeof res !== 'string') {
          const key = CacheUtil.getTokenKey(res.payload.sub);
          const onlineInfo = await this.cacheManager.get<any>(key);

          if (!onlineInfo) {
            throw new UnauthorizedException(MESSAGES.AUTHORIZATION_NOT_CORRECT);
          }

          this.contextService.setPayload(res.payload);
          await this.contextService.setUser(res.payload);

          if (!permission) {
            return true;
          }

          const { permissions } = this.contextService.getUserWithPermission();

          // 管理员权限不做处理
          if (permissions.includes(BASE.ADMIN_PERMISSION)) {
            return true;
          }
          // 没有权限时抛出错误
          if (!permissions.includes(permission)) {
            throw new ForbiddenException(`${MESSAGES.NO_ACCESS} - ${request.method} ${request.url}`);
          }
          return true;
        }
      } catch (error) {
        throw new UnauthorizedException(MESSAGES.AUTHORIZATION_EXPIRED);
      }
    } else {
      throw new UnauthorizedException(MESSAGES.AUTHORIZATION_NOT_CORRECT);
    }

    return true;
  }
}
