/**
 * @name 全局信息类型枚举
 * @param {device.ModelType} 设备类型
 * @param {device.workStatus} 设备状态
 * @param {device.rank} 设备等级
 * @param {device.status} 设备点的状态
 * @param {device.powerMode} 供电方式
 * @param {simCard.reserveStatus} 库存状态
 * @param {simCard.type} 卡类型
 * @param {simCard.status} 物联网卡状态
 */
export declare type globalInfoEnum =
  | 'device.ModelType'
  | 'device.workStatus'
  | 'device.status'
  | 'device.powerMode'
  | 'device.rank'
  | 'simCard.reserveStatus'
  | 'simCard.type'
  | 'simCard.status';

/**
 * @name 基础信息类型枚举
 * @param {deviecType} 设备型号
 */
export declare type baseInfoEnum = 'deviecType';
