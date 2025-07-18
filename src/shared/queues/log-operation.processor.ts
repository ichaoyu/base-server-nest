import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { QUEUES } from '@/constants';

/**
 * 操作日志队列
 */
@Processor(QUEUES.OPER_LOG)
export class LogOperationProcessor {
	@Process()
	async execute(job: Job<any>) {
		return {};
	}
}
