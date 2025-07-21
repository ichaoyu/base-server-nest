import { CaptchaOptions } from './captcha.interface';

/**
 * 验证码服务
 */
export const CAPTCHA_SERVICE = Symbol('CAPTCHA_SERVICE');

/**
 * 验证码配置
 */
export const CAPTCHA_OPTIONS = Symbol('CAPTCHA_OPTIONS');

/**
 * 验证码合并后配置
 */
export const CAPTCHA_MERGED_OPTIONS = Symbol('CAPTCHA_MERGED_OPTIONS');

/**
 * 数字
 */
export const numbers = '0123456789';

/**
 * 小写字母
 */
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';

/**
 * 字母
 */
export const letters = lowerCaseLetters + lowerCaseLetters.toUpperCase();

/**
 * 默认配置
 */
export const defaultOptions: CaptchaOptions = {
	default: {
		size: 4,
		noise: 1,
		width: 120,
		height: 40,
	},
	image: {
		type: 'mixed',
	},
	formula: {},
	text: {},
	expirationTime: 60 * 60 * 1000,
	idPrefix: 'captcha',
};
