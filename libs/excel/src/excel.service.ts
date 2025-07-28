import { randomUUID } from 'node:crypto';

import { BadRequestException, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import ExcelJS from 'exceljs';

import { EXCEL_COLUMN_GROUP, EXCEL_COLUMN_METADATA } from './excel.constant';
import { ExcelCreateOptions, ExcelExportOptions, ExcelImportOptions } from './excel.interface';

export { ExcelJS };

@Injectable()
export class ExcelService {
  /**
   * 处理生成
   * @param {ExcelCreateOptions} options 生成参数
   */
  async handleCreate(options: ExcelCreateOptions) {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet(options.sheetName, options.addWorksheetOptions);

    const columns = this.getColumns(options.Cls);

    ws.columns = columns;

    const buffer = await wb.xlsx.writeBuffer();

    const headers = this.getHeaders(options.fileName);

    return {
      headers,
      body: buffer,
    };
  }

  /**
   * 处理导出
   * @param {ExcelExportOptions} options 导出参数
   */
  async handleExport(options: ExcelExportOptions) {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet(options.sheetName, options.addWorksheetOptions);

    const columns = this.getColumns(options.Cls);
    const rows = this.getRows(options.Cls, options.data);

    ws.columns = columns;
    ws.addRows(rows);

    const buffer = await wb.xlsx.writeBuffer();

    const headers = this.getHeaders(options.fileName);

    return {
      headers,
      body: buffer,
    };
  }

  /**
   * 处理导入
   * @param {ExcelImportOptions} options 导入参数
   */
  async handleImport(options: ExcelImportOptions) {
    const wb = new ExcelJS.Workbook();

    if (options.filePath) {
      await wb.xlsx.readFile(options.filePath);
    } else if (options.fileData) {
      await wb.xlsx.load(options.fileData);
    } else {
      throw new BadRequestException('filePath or fileData must be required');
    }

    const ws = wb.getWorksheet(options.sheetName)!;
    const length = ws.rowCount;
    const rows = ws.getRows(2, length - 1)!;

    const columns = this.getColumns(options.Cls);

    ws.columns = columns;

    const arr = [];

    for (const row of rows) {
      const obj = Object.create({});

      for (const column of columns as Array<{ key: string }>) {
        obj[column.key] = row.getCell(column.key).value;
      }
      // @ts-ignore
      arr.push(obj);
    }

    return arr;
  }

  /**
   * 获取表格列
   * @param {any} Cls 序列化类
   * @private
   */
  private getColumns(Cls: any) {
    const columns = [];
    const obj = instanceToPlain(new Cls({}), { groups: [EXCEL_COLUMN_GROUP] });

    const keys = Object.keys(obj);

    for (const key of keys) {
      const result = Reflect.getMetadata(EXCEL_COLUMN_METADATA, Cls.prototype, key);

      if (result) {
        // @ts-ignore
        columns.push({ key, ...result });
      }
    }

    return columns;
  }

  /**
   * 获取表格行
   * @param {any} Cls 序列化类
   * @param {any} data 数据
   * @private
   */
  private getRows(Cls: any, data: any[]) {
    return data.map(v => instanceToPlain(new Cls(v), { groups: [EXCEL_COLUMN_GROUP] }));
  }

  /**
   * 获取响应头
   * @param {string} filename 文件名
   * @private
   */
  private getHeaders(filename?: string) {
    const name = filename ? encodeURIComponent(filename) : randomUUID();

    return {
      'content-type': 'application/vnd.openxmlformats;charset=utf-8',
      'content-disposition': `attachment; filename=${name}.xlsx`,
    };
  }
}
