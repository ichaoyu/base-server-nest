import { ApiProperty } from '@nestjs/swagger';

import { ResultVO } from '@/interfaces';

/**
 * 登录响应传输对象
 */
export class LoginVO extends ResultVO(String) {}

/**
 * 图形验证码响应传输对象
 */
class CaptchaVO {
	@ApiProperty({ description: '验证码ID' })
	id: string;

	@ApiProperty({ description: '验证码编码' })
	imageBase64: string;
}

/**
 * 获取图形验证码响应传输对象
 */
export class GetCaptchaVO extends ResultVO(CaptchaVO) {}
