/**
 * 系统内置
 */
export enum ENTITY_CONFIG_TYPE {
  /**
   * 是
   */
  YES = 'Y',
  /**
   * 否
   */
  NO = 'N',
}

/**
 * 菜单类型
 */
export enum ENTITY_MENU_TYPE {
  /**
   * 目录
   */
  FOLDER = 'M',
  /**
   * 菜单
   */
  MENU = 'C',
  /**
   * 按钮
   */
  BUTTON = 'F',
}

/**
 * 是否为外链
 */
export enum ENTITY_IS_FRAME {
  /**
   * 是
   */
  YES = '0',
  /**
   * 否
   */
  NO = '1',
}

/**
 * 是否缓存
 */
export enum ENTITY_IS_CACHE {
  /**
   * 是
   */
  YES = '0',
  /**
   * 否
   */
  NO = '1',
}

/**
 * 是否可见
 */
export enum ENTITY_VISIBLE {
  /**
   * 是
   */
  YES = '0',
  /**
   * 否
   */
  NO = '1',
}

/**
 * 状态
 */
export enum ENTITY_STATUS {
  /**
   * 正常
   */
  NORMAL = '0',
  /**
   * 停用
   */
  DISABLE = '1',
}

/**
 * 删除标志
 */
export enum ENTITY_DEL_FLAG {
  /**
   * 存在
   */
  EXIST = '0',
  /**
   * 删除
   */
  DELETE = '2',
}

/**
 * 是否默认
 */
export enum ENTITY_IS_DEFAULT {
  /**
   * 是
   */
  YES = 'Y',
  /**
   * 否
   */
  NO = 'N',
}

/**
 * 登录状态
 */
export enum ENTITY_LOGIN_STATUS {
  /**
   * 成功
   */
  SUCCESS = '0',
  /**
   * 失败
   */
  FAIL = '1',
}

/**
 * 性别
 */
export enum ENTITY_SEX {
  /**
   * 男
   */
  MALE = '0',
  /**
   * 女
   */
  FEMALE = '1',
  /**
   * 未知
   */
  UNKNOWN = '2',
}

/**
 * 业务类型
 */
export enum ENTITY_BIZ_TYPE {
  /**
   * 其他
   */
  OTHER = '0',
  /**
   * 新增
   */
  INSERT = '1',

  /**
   * 修改
   */
  UPDATE = '2',

  /**
   * 删除
   */
  DELETE = '3',

  /**
   * 授权
   */
  GRANT = '4',

  /**
   * 导出
   */
  EXPORT = '5',

  /**
   * 导入
   */
  IMPORT = '6',

  /**
   * 强退
   */
  FORCE = '7',

  /**
   * 清空数据
   */
  CLEAN = '8',
}

/**
 * 业务状态
 */
export enum ENTITY_BIZ_STATUS {
  /**
   * 成功
   */
  SUCCESS = '0',
  /**
   * 失败
   */
  FAIL = '1',
}
