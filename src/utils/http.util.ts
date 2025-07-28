import { InternalServerErrorException, BadRequestException } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

/**
 * 请求工具
 */
export const HttpUtil: { client: AxiosInstance } = (() => {
  // 创建Axios实例并配置默认参数
  const client = axios.create({
    timeout: 8000, // 请求超时时间（毫秒）
    maxRedirects: 5, // 最大重定向次数
  });

  // 响应拦截器，细化错误处理
  client.interceptors.response.use(
    (res: AxiosResponse) => {
      return res;
    },
    (err: any) => {
      if (axios.isAxiosError(err)) {
        // 判断是否为取消请求的错误
        if (err.code === 'ECONNABORTED') {
          throw new BadRequestException('请求超时，请稍后重试');
        }
        // 根据响应状态码进行处理
        if (err.response) {
          switch (err.response.status) {
            case 400:
              throw new BadRequestException('请求参数有误');
            case 500:
              throw new InternalServerErrorException('服务器内部错误');
            default:
              throw new InternalServerErrorException(`HTTP错误: ${err.response.status}`);
          }
        } else {
          // 非HTTP错误
          throw new InternalServerErrorException('未知错误');
        }
      } else {
        // 非Axios错误
        throw new InternalServerErrorException('未知错误');
      }
    },
  );

  return { client };
})();
