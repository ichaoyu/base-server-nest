import { access, constants, mkdir } from 'node:fs/promises'; // 使用异步文件系统操作
import { tmpdir } from 'node:os';
import { join, normalize } from 'node:path';

import {
	createParamDecorator,
	ExecutionContext,
	HttpException,
	HttpStatus,
} from '@nestjs/common';

import { BASE, MESSAGES } from '@/constants';

interface FileConfig {
	tmpdir: string;
	preservePath?: boolean;
	limits?: {
		fileSize?: number;
	};
}

const defaultConfig: FileConfig = {
	tmpdir: join(tmpdir(), BASE.UPLOAD_FILE),
	preservePath: true,
	limits: {
		fileSize: 102400000, // 100mb
	},
};

/**
 * 文件装饰器
 */
export const Files = createParamDecorator(
	async (data: Partial<FileConfig>, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const config = Object.assign(defaultConfig, data);

		try {
			// 检查目录是否存在
			await access(config.tmpdir, constants.F_OK);
		} catch (error) {
			// 如果不存在则创建目录
			try {
				await mkdir(config.tmpdir, { recursive: true });
			} catch (mkdirError) {
				throw new HttpException(
					MESSAGES.CANNOT_CREATE_UPLOAD_DIR,
					HttpStatus.INTERNAL_SERVER_ERROR,
				);
			}
		}

		try {
			return await request.saveRequestFiles(config);
		} catch (error) {
			// 提供更具体的错误信息
			const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
			const message = error.message || MESSAGES.FILE_UPLOAD_FAILED;
			throw new HttpException(message, statusCode);
		}
	},
);
