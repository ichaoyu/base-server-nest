import { Controller, Get, Post, Body } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import { Public } from '@/decorators';

import { AuthService } from './auth.service';
import { GetCaptchaVO, LoginVO } from './auth.vo';
import { LoginDTO } from './auth.dto';

@ApiTags('鉴权接口')
@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	//#region 登录
	@ApiOperation({ summary: '登录' })
	@ApiOkResponse({ type: LoginVO })
	@Public()
	@Post('/login')
	async login(@Body() body: LoginDTO) {
		return await this.authService.handleLogin(body);
	}
	// #endregion 登录

	//#region 退出登录
	@ApiBearerAuth()
	@ApiOperation({ summary: '退出登录' })
	@Post('/logout')
	async logout() {
		await this.authService.logout();
	}
	//#endregion退出登录

	//#region 获取验证码
	@ApiOperation({ summary: '获取验证码' })
	@ApiOkResponse({ type: GetCaptchaVO })
	@Public()
	@Get('/captcha')
	async getCaptcha() {
		const res = await this.authService.getCaptcha();
		return res;
	}
	//#endregion获取验证码
}
