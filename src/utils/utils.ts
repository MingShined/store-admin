import moment from 'moment';
import { message } from 'antd';

/**
 * @name 转化为单位分
 * @param {keysArr} 要替换的对象key数组
 * @param {values} 转化的对象
 */
export function transformUnit(keysArr: any[], values: Object) {
  const result = values;
  const formatArr = keysArr;
  Object.keys(result).forEach(key => {
    formatArr.forEach(item2 => {
      if (item2 === key) {
        result[key] = result[key] * 100;
      }
    });
  });
  return result;
}
/**
 * @name 转化枚举获取keys
 * @param {value} 要转化的枚举对象
 */
export function transformEnumKeys(value): string[] {
  const keys = Object.keys(value);
  const result = keys.slice(0, keys.length / 2);
  return result;
}

/**
 * @name moment工具，获取指定日期
 * @param {type} 指定类型 年 | 月 | 星期 | 天
 * @param {isNext} 指定日期类型之后 | 指定日期之前
 * @param {value} 指定的数量
 */
export function getAppointedDate<T>(
  type: 'day' | 'week' | 'month' | 'year',
  isNext: boolean,
  value: number
): string[] {
  const formatList = ['YYYY-MM-DDT00:00:00Z', 'YYYY-MM-DDT23:59:59Z'];
  const today = moment();
  const otherDay = isNext
    ? moment().add(type, value)
    : moment().subtract(type, value);
  const finalDay = isNext ? [today, otherDay] : [otherDay, today];
  return finalDay.map((item, index) => item.format(formatList[index]));
}
/**
 * @name 下载文件
 */
export async function downloadRequest(url, title?) {
  const { data, status, headers } = await request({
    url,
    responseType: 'blob'
  });
  let mtitle = title;
  if (!mtitle) {
    mtitle = headers['content-disposition'].replace('attachment;filename=', '');
  }
  if (status === 200) {
    download(data, mtitle);
  }
}

interface CheckFileOption {
  length?: number;
  width?: number;
  height?: number;
  file?: File;
  accept?: any;
  size?: number;
}
export function checkFile({ length, width, height, file, accept, size }: CheckFileOption) {
  if (!file) {
    message.error('file 不存在!');
    return new Promise((resolve, reject) => {
      reject();
    });
  }
  if (size && file.size > size * size) {
    message.warning('文件超出大小!');
    return new Promise((resolve, reject) => {
      reject();
    });
  }
  /** 验证文件类型 */
  if (accept && !(accept instanceof Array) && file.type.indexOf(accept) === -1) {
    message.error(`文件类型错误，请选择${accept}格式的文件!`);
    return new Promise((resolve, reject) => {
      reject();
    });
    // tslint:disable-next-line:no-else-after-return
  } else if (accept && accept instanceof Array) {
    const str = file.name;
    const i = str.lastIndexOf('.');
    const len = str.length;
    const hz = str.substring(i + 1, len);
    const flag = false;
    if (accept.filter((type) => type === hz).length === 0) {
      message.error(`文件类型错误，请选择${accept.join('/')}格式的文件!`);
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  }
  const _w = width;
  const _h = height;
  /** 上传图片 */
  if (file.type.indexOf('image') !== -1) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        /** 验证宽度 */
        if (_w && img.width !== _w && _h === null) {
          message.error(`图片宽度为 ${_w} 高度不做限制`);
          reject();
        } else if (_h && img.height !== _h && _w === null) {
          /** 验证高度 */
          message.error(`图片高度为 ${_h} 宽度不做限制`);
          reject();
        } else if (_w && img.width !== _w && _h && img.height !== _h) {
          message.error(`图片尺寸为 ${_w} * ${_h}`);
          reject();
        } else {
          resolve({
            src: img.src,
            width: img.width,
            height: img.height
          });
        }
      };
      img.onerror = () => {
        reject();
      };
      img.src = window.URL.createObjectURL(file);
    });
  }
  return new Promise((resolve, reject) => {
    resolve();
  });
}