import { Inject, Injectable } from '@nestjs/common';
import { RedisClient, REDIS_CLIENT } from '@app/redis';

import { SysUtil } from '@/utils';

@Injectable()
export class EventsService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redisClient: RedisClient,
  ) {}

  async handleGetInfo() {
    //#region CPU

    const { currentLoadUser, currentLoadSystem, currentLoadIdle } = await SysUtil.si.currentLoad();
    const { cores } = await SysUtil.si.cpu();

    const cpuInfo = [
      { key: '核心数', value: cores },
      { key: '用户使用率', value: currentLoadUser.toPrecision(2) },
      { key: '系统使用率', value: currentLoadSystem.toPrecision(2) },
      { key: '当前空闲率', value: currentLoadIdle.toPrecision(2) },
    ];

    //#endregion

    //#region Memory

    const { total, free, used } = await SysUtil.si.mem();

    const sysMemoryInfo = {
      total,
      used,
      free,
      rate: (1 - free / total).toPrecision(2),
    };

    const { heapTotal, heapUsed } = process.memoryUsage();

    const nodeMemoryInfo = {
      total: heapTotal,
      used: heapUsed,
      free: heapTotal - heapUsed,
      rate: (1 - heapUsed / heapTotal).toPrecision(2),
    };

    const memInfo = [
      {
        key: '总内存',
        sys: sysMemoryInfo.total,
        node: nodeMemoryInfo.total,
      },
      {
        key: '已用内存',
        sys: sysMemoryInfo.used,
        node: nodeMemoryInfo.used,
      },
      {
        key: '剩余内存',
        sys: sysMemoryInfo.free,
        node: nodeMemoryInfo.free,
      },
      {
        key: '使用率',
        sys: sysMemoryInfo.rate,
        node: nodeMemoryInfo.rate,
      },
    ];

    //#endregion

    //#region OS

    const osInfoBase = await SysUtil.si.osInfo();
    const ip = await SysUtil.localIP4();

    const osInfo = { ...osInfoBase, ip };

    //#endregion

    //#region Disk
    const diskInfo = await SysUtil.si.fsSize();

    //#endregion

    //#region Node

    const version = process.version;
    const nodePath = process.argv[0];
    const filePath = process.argv[1];
    const args = process.argv.splice(2);
    const uptime = process.uptime();

    const nodeInfo = {
      version,
      nodePath,
      filePath,
      args,
      uptime,
    };

    //#endregion

    //#region

    const rawInfo = await this.redisClient.info();
    const db_size = await this.redisClient.dbsize();
    const parsedInfo = SysUtil.getProperties(rawInfo);

    const redisInfo = { db_size, ...parsedInfo };

    //#endregion

    return {
      cpu: cpuInfo,
      mem: memInfo,
      os: osInfo,
      disk: diskInfo,
      node: nodeInfo,
      redis: redisInfo,
    };
  }
}
