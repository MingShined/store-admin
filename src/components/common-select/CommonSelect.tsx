/**
 * @name 全局信息下拉组件
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { transformEnumKeys } from 'src/utils/utils';

interface CommonSelectProps extends Basic.BaseProps, SelectProps {
  dataSource: any[] | Object;
  onRender: (item: any, index: number) => React.ReactNode;
}

export default class CommonSelect extends Component<CommonSelectProps> {
  static Option = Select.Option;
  render() {
    const { dataSource, onRender } = this.props;
    // if (dataSource instanceof Array && (!dataSource || !dataSource.length)) {
    //   return null;
    // }
    // if (dataSource instanceof Object && !Object.keys(dataSource).length) {
    //   return null;
    // }
    const data =
      dataSource instanceof Array ? dataSource : transformEnumKeys(dataSource);
    return (
      <Select allowClear placeholder="请选择" {...this.props}>
        {data.map((item, index) => onRender(item, index))}
      </Select>
    );
  }
}
