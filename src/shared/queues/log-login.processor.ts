import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { QUEUES } from '@/constants';

/**
 * 登录日志队列
 */
@Processor(QUEUES.LOGIN_LOG)
export class LogLoginProcessor {
	@Process()
	async execute(job: Job<any>) {}
}
