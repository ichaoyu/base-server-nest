import { InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

/**
 * 请求工具
 */
export const HttpUtil = {
	/**
	 * 客户端
	 */
	client: (() => {
		const client = axios.create({
			timeout: 8000,
			maxRedirects: 5,
		});

		client.interceptors.request.use(req => {
			return req;
		});

		client.interceptors.response.use(
			res => {
				return res;
			},
			err => {
				throw new InternalServerErrorException(err);
			},
		);

		return client;
	})(),
};
