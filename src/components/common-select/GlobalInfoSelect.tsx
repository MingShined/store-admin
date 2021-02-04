/**
 * @name 全局信息下拉组件
 * @author MingShined
 */
import { RematchDispatch, RematchRootState } from '@rematch/core';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import React, { Component } from 'react';
import { Basic } from 'src/types';
import { connect, Models } from 'store';
import { globalInfoEnum } from './type';

const Option = Select.Option;

const mapState = ({ app }: RematchRootState<Models>) => ({ app });
const mapDispatch = ({ app }: RematchDispatch<Models>) => ({ appEffects: app });
interface GlobalInfoSelectProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>>,
    SelectProps,
    Basic.BaseProps {
  type: globalInfoEnum;
}

@connect(
  mapState,
  mapDispatch
)
export default class GlobalInfoSelect extends Component<GlobalInfoSelectProps> {
  render() {
    const {
      type,
      app: { globalInfo }
    } = this.props;
    if (Object.keys(globalInfo).length === 0) {
      return false;
    }
    return (
      <Select allowClear {...this.props}>
        <Option key="empty" value="">
          请选择
        </Option>
        {/* {eval(`globalInfo.${type}`).map((item, index) => (
            <Option key={item.id.toString()} value={item.id}>
              {item.name}
            </Option>
          ))} */}
      </Select>
    );
  }
}
