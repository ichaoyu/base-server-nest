import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { QUEUES } from '@/constants';
import { SharedService } from '@/shared';
import { SysUtil } from '@/utils';

/**
 * 登陆日志队列
 */
@Processor(QUEUES.LOGIN_LOG)
export class LoginLogProcessor {
	constructor(private readonly sharedService: SharedService) {}

	@Process()
	async execute(job: Job<any>) {
		const { ip, userAgent, ...rest } = job.data;
		const loginIp = await SysUtil.parseIP(ip);
		const loginLocation = await SysUtil.parseAddress(loginIp);
		const ua = SysUtil.parseUA(userAgent);
		const os = ua.os.name;
		const browser = ua.browser.name;

		await this.sharedService.setLoginLog({
			...rest,
			loginIp,
			loginLocation,
			browser,
			os,
		});

		return {
			loginIp,
			loginLocation,
			os,
			browser,
		};
	}
}
