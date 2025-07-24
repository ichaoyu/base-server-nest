import { ApiProperty } from '@nestjs/swagger';

/**
 * 结果响应传输对象
 * @param {T} classRef 响应数据类
 */
export function ResultVO<T>(classRef: T) {
	class Result {
		@ApiProperty({ description: '状态码', example: 200 })
		status: number;

		@ApiProperty({ description: '响应消息', example: 'ok' })
		message: string;

		@ApiProperty({ description: '响应数据', type: () => classRef })
		data: T;
	}
	return Result;
}

/**
 * 分页响应对象
 * @param {T} classRef 列表类
 */
export function PageVO<T>(classRef: T) {
	class Page {
		@ApiProperty({ description: '页码' })
		pageNum: number;

		@ApiProperty({ description: '页长' })
		pageSize: number;

		@ApiProperty({ description: '总数' })
		total: number;

		@ApiProperty({ description: '列表', type: () => [classRef] })
		list: T[];
	}
	return Page;
}
