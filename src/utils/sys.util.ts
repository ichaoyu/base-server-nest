import { BadRequestException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { isEmpty } from 'lodash-unified';
import { UAParser } from 'ua-parser-js';

import { nanoid } from 'nanoid';
import { getProperties } from 'properties-file';
import { Systeminformation } from 'systeminformation';

import { BASE, MESSAGES } from '@/constants';
import { HttpUtil } from './http.util';

const si = require('systeminformation');

export const SysUtil = {
	// 是否是测试环境
	isTesting: process.env.NODE_ENV === 'testing',
	// 是否开发环境
	isDev: process.env.NODE_ENV === 'development',
	// 是否正式环境
	isProd: process.env.NODE_ENV === 'production',
	// 本地IP 4地址
	localIP4: async () => {
		const network = await getDefaultNetwork();
		return network.ip4;
	},
	// 本地IP 6地址
	localIP6: async () => {
		const network = await getDefaultNetwork();
		return network.ip6;
	},
	// 是否本地IP地址
	isLocalIP: async (ip: string) => {
		const internalIP = await SysUtil.localIP4();

		if (ip.includes(internalIP) || ip.includes(BASE.LOCAL_IP)) {
			return true;
		}
		return false;
	},
	// 解析IP地址
	parseIP: async (ip: string) => {
		if (ip === null) {
			return BASE.LOCAL_IP;
		}
		const isLocalIP = await SysUtil.isLocalIP(ip);
		return isLocalIP ? BASE.LOCAL_IP : ip;
	},
	// 解析用户代理字符串
	parseUA: (ua: string) => {
		const uaParser = new UAParser(ua, {
			browser: [
				[/(apifox)\/([\w.]+)/i],
				[UAParser.BROWSER.NAME, UAParser.BROWSER.VERSION],
			],
		});

		return uaParser.getResult();
	},
	// 解析地址
	parseAddress: async (ip: string) => {
		const isLocalIP = await SysUtil.isLocalIP(ip);

		if (isLocalIP) {
			return BASE.LOCAL_IP_TEXT;
		}

		const { data } = await HttpUtil.client
			.get(`${BASE.ADDR_URL}`, {
				params: { ip },
			})
			.catch((error: AxiosError) => {
				throw new BadRequestException(error?.response?.data);
			});

		if (isEmpty(data.data.address)) {
			return BASE.DEFAULT_ADDR;
		}

		const [country, province, city, operation] = data.data.address
			.split(' ')
			.filter(v => v !== '');

		return `${province} ${city}`;
	},
	// 系统信息
	si,
	// ID 生成器
	nanoid,
	// `.properties` 解析
	getProperties,
};

/**
 * 获取默认网路信息
 */
async function getDefaultNetwork(): Promise<Systeminformation.NetworkInterfacesData> {
	try {
		const si = require('systeminformation');
		// 获取默认网络接口信息
		const network = await si.networkInterfaces('default');
		return network; // 返回网络接口数据
	} catch (error) {
		// 如果发生错误，抛出 BadRequestException 异常
		throw new BadRequestException(MESSAGES.GET_DEFAULT_NETWORK_FAILED);
	}
}
