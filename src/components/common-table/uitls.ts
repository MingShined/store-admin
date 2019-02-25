import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';

/**
 * @name 通用表格默认属性
 */
export const commonTableDefaultProps: ColumnProps<any> = {
  align: 'center',
  render: text => (text || text === 0 ? text : '--')
};

/**
 * @name 渲染枚举列
 * @param text 列数据
 * @param enumList 枚举列表
 */
export function renderEnumColumn<T>(text: any, enumList: any): string {
  const isArray = enumList instanceof Array;
  if (isArray) {
    const findItem = enumList.find(item => item.id === text);
    return text !== undefined ? findItem && findItem.name : '--';
  }
  return text !== undefined ? enumList[text] : '--';
}
/**
 * @name 渲染日期列
 * @param text 列数据
 * @param format 日期格式
 */
export function renderDateColumn<T>(
  text: string,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  return text ? moment(text).format(format) : '--';
}
