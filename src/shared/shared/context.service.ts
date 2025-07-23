import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { IPayload, IRequest } from '@/interfaces';
import { SharedService } from './shard.service';

// 上下文服务
@Injectable({ scope: Scope.REQUEST })
export class ContextService {
	constructor(
		@Inject(REQUEST) private readonly request: IRequest,
		private readonly sharedService: SharedService,
	) {}
	// 获取IP
	getIP() {
		return this.request.ip;
	}
	// 获取浏览器代理UA
	getUA() {
		return this.request.headers['user-agent'];
	}
	// 设置请求上下文payload
	setPayload(payload: IPayload) {
		this.request.payload = payload;
	}
	// 获取请求上下文payload
	getPayload() {
		return this.request.payload;
	}
	// 从请求上下文获取用户
	getUser() {
		return this.request.user;
	}
	// 从请求上下文中获取用户带权限
	getUserWithPermission() {
		const user = this.getUser();
		return this.sharedService.getUserWithPermission(user);
	}
}
