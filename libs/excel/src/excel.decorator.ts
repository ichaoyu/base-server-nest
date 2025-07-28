import { Expose } from 'class-transformer';

import { EXCEL_COLUMN_GROUP, EXCEL_COLUMN_METADATA } from './excel.constant';
import { ExcelColumnOptions } from './excel.interface';

/**
 * 表格列装饰器
 */
export function ExcelColumn(options?: ExcelColumnOptions): PropertyDecorator {
  return (...args) => {
    Reflect.metadata(EXCEL_COLUMN_METADATA, options)(...args);
    Expose({ groups: [EXCEL_COLUMN_GROUP] })(...args);
  };
}
