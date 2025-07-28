import { InjectQueue } from '@nestjs/bull';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Queue } from 'bull';
import { pick } from 'lodash-unified';
import { catchError, tap, throwError } from 'rxjs';

import { ENTITY_BIZ_STATUS, ENTITY_BIZ_TYPE, QUEUES } from '@/constants';
import { OperLog } from '@/decorators';
import { IRequest } from '@/interfaces';

/**
 * 操作日志拦截器
 */
@Injectable({
  scope: Scope.REQUEST,
})
export class OperLogInterceptor implements NestInterceptor {
  constructor(
    @InjectQueue(QUEUES.OPER_LOG)
    private operLogQueue: Queue,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest<IRequest>();
    const apiPath = this.configService.get('app.apiPath');
    const isApi = request.url.includes(apiPath);

    // 非接口请求直接跳过
    if (!isApi) {
      return next.handle();
    }

    const operLog = this.reflector.get(OperLog, context.getHandler());

    // 没有操作日志注解直接跳过
    if (!operLog) {
      return next.handle();
    }

    const { title, bizType } = operLog;
    const method = `${context.getClass().name}.${context.getHandler().name}`;

    const logData = {
      title,
      bizType,
      method,
      requestMethod: request.method,
      requestUrl: request.url,
      requestParams:
        // 导入业务参数不赋值
        bizType !== ENTITY_BIZ_TYPE.IMPORT ? JSON.stringify(pick(request, ['params', 'query', 'body'])) : null,
      ip: request.headers['x-forwarded-for'] || request.ip,
      operName: request.payload.userName,
      operTime: Date.now(),
    };

    return next.handle().pipe(
      tap(async data => {
        const { operTime, ...rest } = logData;
        const costTime = Date.now() - operTime;

        this.operLogQueue.add({
          ...rest,
          requestResult:
            // 导出业务结果不赋值
            logData.bizType !== ENTITY_BIZ_TYPE.EXPORT ? JSON.stringify(data) : null,
          status: ENTITY_BIZ_STATUS.SUCCESS,
          operTime: new Date(operTime),
          costTime,
        });
      }),
      catchError(err => {
        const { operTime, ...rest } = logData;
        const costTime = Date.now() - operTime;

        this.operLogQueue.add({
          ...rest,
          status: ENTITY_BIZ_STATUS.FAIL,
          errorMsg: err.message,
          operTime: new Date(operTime),
          costTime,
        });

        return throwError(() => err);
      }),
    );
  }
}
