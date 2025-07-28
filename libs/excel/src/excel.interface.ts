import { AddWorksheetOptions, Column } from 'exceljs';

/**
 * Excel 装饰器参数
 */
export type ExcelColumnOptions = Partial<Column>;

/**
 * Excel 导出参数
 */
export interface ExcelExportOptions {
  /**
   * 表格名
   */
  sheetName: string;
  /**
   * 文件名
   */
  fileName?: string;
  /**
   * 序列化类
   */
  Cls: any;
  /**
   * 数据
   */
  data: any[];
  /**
   * 新增报表配置
   */
  addWorksheetOptions?: Partial<AddWorksheetOptions>;
}

/**
 * Excel 创建参数
 */
export interface ExcelCreateOptions {
  /**
   * 文件名
   */
  fileName: string;
  /**
   * 表格名
   */
  sheetName: string;
  /**
   * 序列化类
   */
  Cls: any;
  /**
   * 新增报表配置
   */
  addWorksheetOptions?: Partial<AddWorksheetOptions>;
}

/**
 * Excel 导入参数
 */
export interface ExcelImportOptions {
  /**
   * 文件路径
   */
  filePath?: string;
  /**
   * 文件内容
   */
  fileData?: Buffer;
  /**
   * 表格名
   */
  sheetName: string;
  /**
   * 序列化类
   */
  Cls: any;
}

/**
 * Excel 模块配置
 */
export interface ExcelModuleOptions {
  /**
   * 是否注册为全局模块
   */
  global?: boolean;
}
