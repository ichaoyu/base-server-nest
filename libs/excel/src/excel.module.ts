import { DynamicModule, Module } from '@nestjs/common';
import { ExcelService } from './excel.service';

import { EXCEL_SERVICE } from './excel.constant';
import { ExcelModuleOptions } from './excel.interface';

export class ExcelModule {
  static registerAsync(params: ExcelModuleOptions) {
    const { global } = params;

    @Module({})
    class ExcelCoreModule {
      static create(): DynamicModule {
        return {
          global,
          module: ExcelCoreModule,
          providers: [
            {
              provide: EXCEL_SERVICE,
              useClass: ExcelService,
            },
          ],
          exports: [EXCEL_SERVICE],
        };
      }
    }

    return ExcelCoreModule.create();
  }
}
