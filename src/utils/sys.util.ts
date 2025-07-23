import { BadRequestException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { isEmpty } from 'lodash-unified';
import { Systeminformation } from 'systeminformation';
import { UAParser } from 'ua-parser-js';

import { nanoid } from 'nanoid';
import { getProperties } from 'properties-file';
import systeminformation from 'systeminformation';

import { BASE } from '@/constants';
import { HttpUtil } from './http.util';

/**
 * 获取默认网路信息
 */
async function getDefaultNetwork(): Promise<Systeminformation.NetworkInterfacesData> {
	try {
		// 获取默认网络接口信息
		const network = await SysUtil.sysinfo.networkInterfaces('default');
		return network; // 返回网络接口数据
	} catch (error) {
		// 如果发生错误，抛出 BadRequestException 异常
		throw new BadRequestException('获取默认网络信息失败');
	}
}

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
		const localIP4 = await SysUtil.localIP4();
		const localIP6 = await SysUtil.localIP6();
		return localIP4.includes(ip) || localIP6.includes(ip);
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
		try {
			const parser = UAParser(ua);
			return parser;
		} catch (error) {
			// 如果解析失败，返回默认对象或处理错误
			console.error('UA解析失败:', error);
			return {};
		}
		// const { browser, cpu, device } = UAParser(ua);

		// console.log(browser.name); // Maemo Browser
		// console.log(cpu.is('arm')); // true
		// console.log(device.is('mobile')); // true
		// console.log(device.model); // N900
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
	sysinfo: systeminformation,
	// ID 生成器
	nanoid,
	// `.properties` 解析
	getProperties,
};
