/**
 * @name 运营商下拉列表
 * @author MingShined
 */
import React, { Component, Fragment } from 'react';
import { Basic } from 'src/types';
import { findIotCarrierAccountsAllByStatus } from 'src/services/CarService';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

const Option = Select.Option;

interface Props extends Basic.BaseProps, SelectProps {}

export default class OperatorSelect extends Component<Props> {
  state = {
    dataSource: []
  };
  componentWillMount = async () => {
    const { data, status } = await findIotCarrierAccountsAllByStatus({
      status: 2
    });
    if (status === 200 && data) {
      this.setState({
        dataSource: data
      });
    }
  };

  render() {
    // const {} = this.props;
    const { dataSource } = this.state;
    return (
      <Fragment>
        <Select allowClear {...this.props}>
          <Option key="empty" value="">
            请选择
          </Option>
          {dataSource.length > 0 &&
            dataSource.map((item, index) => (
              <Option key={index.toString()} value={item.id}>
                {item.name}
              </Option>
            ))}
        </Select>
      </Fragment>
    );
  }
}
