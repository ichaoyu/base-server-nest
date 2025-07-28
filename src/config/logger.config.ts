import { ConfigService } from '@nestjs/config';
import { utilities, WinstonModuleAsyncOptions } from 'nest-winston';
import { format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const isDebug = process.env.NODE_ENV === 'development';

/**
 * 创建一个按日期轮换的日志传输器
 * @param {string} level - 日志级别
 * @param {string} filename - 日志文件名
 * @returns {DailyRotateFile} - 返回一个按日期轮换的日志传输器
 */
const createDailyRotateTransport = (level: string, filename: string) => {
  return new DailyRotateFile({
    // 设置日志级别
    level,
    // 设置日志文件目录
    dirname: 'logs',
    // 设置日志文件名
    filename: `${filename}-%DATE%.log`,
    // 设置日期模式
    datePattern: 'YYYY-MM-DD-HH',
    // 启用压缩归档
    zippedArchive: true,
    // 设置最大文件大小
    maxSize: '20m',
    // 设置最大文件保留天数
    maxFiles: '14d',
    // 设置日志格式
    format: format.combine(format.timestamp(), format.simple()),
  });
};

export const LOGGER_OPTIONS: WinstonModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => {
    return {
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.ms(),
            utilities.format.nestLike('Nest', {
              colors: true,
              prettyPrint: true,
              processId: true,
            }),
          ),
        }),
        // 如果不是开发环境，配置文件日志传输器
        ...(isDebug
          ? []
          : [
              // 创建一个按日期轮换的日志传输器，用于记录错误日志
              createDailyRotateTransport('warn', 'error'),
              // 创建一个按日期轮换的日志传输器，用于记录应用程序日志
              createDailyRotateTransport('info', 'app'),
            ]),
      ],
    };
  },
  inject: [ConfigService],
};
