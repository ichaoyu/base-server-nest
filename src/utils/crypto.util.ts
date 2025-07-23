import * as bcrypt from 'bcrypt';

/**
 * 加密解密工具
 */
export const CryptoUtil = {
	/**
	 * 比较密码
	 * @param {string} newVal 新密码
	 * @param {string} oldVal 旧密码
	 */
	compare: async (newVal: string, oldVal: string) => {
		return await bcrypt.compare(newVal, oldVal);
	},
	/**
	 * 加密密码
	 * @param {string} val 原始密码
	 */
	crypto: async (val: string) => {
		const salt = await bcrypt.genSalt(10);

		return await bcrypt.hash(val, salt);
	},
};
