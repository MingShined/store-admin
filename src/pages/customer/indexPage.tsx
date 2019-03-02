/**
 * @name 组件名
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import PageLayout from 'src/components/page-layout';
import Table, { ColumnProps } from 'antd/lib/table';
import {
  commonTableDefaultProps,
  renderEnumColumn,
  renderDateColumn
} from 'src/components/common-table/uitls';
import CommonTable from 'src/components/common-table';
import IndexService from '../service';

const getColumns = (that: CustomerManage): ColumnProps<any>[] => {
  return [
    {
      ...commonTableDefaultProps,
      title: '序号',
      dataIndex: '',
      render: (text, row, index) => index + 1
    },
    { ...commonTableDefaultProps, title: '昵称', dataIndex: 'username' },
    { ...commonTableDefaultProps, title: '姓名', dataIndex: 'realName' },
    { ...commonTableDefaultProps, title: '手机', dataIndex: 'phone' },
    { ...commonTableDefaultProps, title: '地址', dataIndex: 'address' },
    {
      ...commonTableDefaultProps,
      title: '最后修改时间',
      dataIndex: 'gmtModify',
      render: text => renderDateColumn(text)
    }
  ];
};
interface Props extends Basic.BaseProps {}

export default class CustomerManage extends Component<Props> {
  state = {
    customerList: []
  };
  componentWillMount() {
    this.queryCustomerList();
  }
  async queryCustomerList() {
    const { data, status } = await IndexService.queryCustomer();
    if (status === 200 && data) {
      this.setState({
        customerList: data
      });
    }
  }
  render() {
    // const {} = this.props;
    const { customerList } = this.state;
    return (
      <PageLayout title="客户管理">
        <Table
          columns={getColumns(this)}
          dataSource={customerList}
          bordered
          rowKey={(row, index) => row._id.toString()}
        />
      </PageLayout>
    );
  }
}
