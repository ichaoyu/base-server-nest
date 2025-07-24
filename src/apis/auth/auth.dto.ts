import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

/**
 * 登录请求传输对象
 */
export class LoginDTO {
	/**
	 * 账号
	 */
	@ApiProperty({ description: '账号', example: '' })
	@IsNotEmpty({ message: '账号不能为空' })
	userName: string;

	/**
	 * 密码
	 */
	@ApiProperty({ description: '密码', example: '' })
	@IsNotEmpty({ message: '密码不能为空' })
	@MinLength(6, { message: '密码最少6位' })
	password: string;

	/**
	 * 验证码编号
	 */
	@ApiProperty({ description: '验证码编号', example: '' })
	@IsNotEmpty({ message: '验证码编号不能为空' })
	captchaId: string;

	/**
	 * 验证码值
	 */
	@ApiProperty({ description: '验证码值', example: '' })
	@IsNotEmpty({ message: '验证码值不能为空' })
	captchaValue: string;
}
