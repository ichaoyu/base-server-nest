import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Queue } from 'bull';
import { CAPTCHA_SERVICE, CaptchaService } from '@app/captcha';

import { ContextService, SharedService } from '@/shared';

import { LoginDTO } from './auth.dto';

import { SysUserEntity } from '@/entities';
import {
	QUEUES,
	MESSAGES,
	ENTITY_DEL_FLAG,
	ENTITY_LOGIN_STATUS,
} from '@/constants';
import { CacheUtil, CryptoUtil, SysUtil } from '@/utils';
import { IOnlineInfo } from '@/interfaces';

@Injectable()
export class AuthService {
	constructor(
		@Inject(CACHE_MANAGER)
		private readonly cacheManager: Cache,
		@Inject(CAPTCHA_SERVICE)
		private readonly captchaService: CaptchaService,
		@InjectRepository(SysUserEntity)
		private readonly userModel: Repository<SysUserEntity>,
		@InjectQueue(QUEUES.LOGIN_LOG)
		private readonly loginLogQueue: Queue,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly contextService: ContextService,
		private readonly sharedService: SharedService,
	) {}

	//#region 登录
	async handleLogin(body: LoginDTO) {
		const { userName, password, captchaId, captchaValue } = body;
		const passed = await this.captchaService.check(captchaId, captchaValue);
		// 验证码错误
		if (!passed && !SysUtil.isTesting) {
			throw new BadRequestException(MESSAGES.CAPTCHA_NOT_CORRECT);
		}
		const user = await this.userModel
			.createQueryBuilder('user')
			.leftJoinAndSelect('user.dept', 'dept')
			.select(['user', 'dept.id', 'dept.deptName'])
			.addSelect('user.password')
			.where({
				userName,
				delFlag: ENTITY_DEL_FLAG.EXIST,
			})
			.getOne();
		if (!user) {
			throw new BadRequestException(MESSAGES.USER_NOT_EXIST);
		}

		// 检查用户状态，确保被禁用的用户无法登录
		// if (user.status === ENTITY_LOGIN_STATUS.DISABLED) {
		// 	throw new BadRequestException(MESSAGES.USER_IS_DISABLED);
		// }
		const isMatch = await CryptoUtil.compare(password, user.password);
		const deptName = user?.dept?.deptName ?? '';
		const loginDate = new Date();
		const ip = this.contextService.getIP();
		const userAgent = this.contextService.getUA();
		const tokenId = SysUtil.nanoid();
		const userId = user.id;
		// 保存登录日志
		if (!isMatch) {
			this.loginLogQueue.add({
				userName,
				status: ENTITY_LOGIN_STATUS.FAIL,
				msg: MESSAGES.ACCOUNT_OR_PASSWORD_ERROR,
				loginDate,
				ip,
				userAgent,
			});
			throw new BadRequestException(MESSAGES.ACCOUNT_OR_PASSWORD_ERROR);
		}

		// 加入队列
		const loginLogJob = await this.loginLogQueue.add({
			userName,
			status: ENTITY_LOGIN_STATUS.SUCCESS,
			msg: MESSAGES.LOGIN_SUCCESS,
			loginDate,
			ip,
			userAgent,
		});

		const jobRes = await loginLogJob.finished();

		// 更新登录时间和ip
		await this.userModel.update(userId, {
			loginDate,
			loginIp: jobRes.loginIp,
		});
		// 缓存token
		const isSoloLogin = await this.sharedService.isSoloLogin();
		const ttl = this.configService.get('jwt.signOptions.expiresIn');
		if (isSoloLogin) {
			const userKey = CacheUtil.getUserKey(userId);
			const oldTokenId = await this.cacheManager.get<string>(userKey);
			if (oldTokenId) {
				await this.cacheManager.del(CacheUtil.getTokenKey(oldTokenId));
			}
			await this.cacheManager.set(userKey, tokenId, ttl);
		}
		await this.cacheManager.set(
			CacheUtil.getTokenKey(tokenId),
			{
				tokenId,
				userId,
				userName,
				deptName,
				loginDate,
				...jobRes,
			},
			ttl,
		);

		return this.jwtService.sign({ userName, userId, sub: tokenId });
	}
	//#endregion登录

	//#region 退出登录
	async logout() {
		const isSoloLogin = await this.sharedService.isSoloLogin();
		const payload = this.contextService.getPayload();
		// 判断是否已过期
		if (payload) {
			const tokenKey = CacheUtil.getTokenKey(payload.sub);
			// 是否启用单点登录
			if (isSoloLogin) {
				// 从缓存中获取在线信息
				const onlineInfo = await this.cacheManager.get<IOnlineInfo>(tokenKey);
				const userKey = CacheUtil.getUserKey(onlineInfo?.userId ?? '');
				await this.cacheManager.del(userKey);
			}
			await this.cacheManager.del(tokenKey);
		}
	}
	//#endregion退出登录

	//#region 获取验证码
	async getCaptcha() {
		const captcha = await this.captchaService.image({
			width: 100,
			height: 40,
			noise: 2,
			size: 4,
		});
		return captcha;
	}
	//#endregion获取验证码
}
