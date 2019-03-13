/**
 * @name 订单列表
 * @author MingShined
 */
import React, { Component, Fragment } from 'react';
import { Basic } from 'src/types';
import { ColumnProps } from 'antd/lib/table';
import {
  commonTableDefaultProps,
  renderEnumColumn,
  renderDateColumn
} from 'src/components/common-table/uitls';
import CommonTable from 'src/components/common-table';
import IndexService from 'src/pages/service';
import ButtonGroup from 'antd/lib/button/button-group';
import { Badge, Button } from 'antd';
import store, { connect, Models } from 'store';
import { RematchRootState, RematchDispatch } from '@rematch/core';

/**
 * @name 订单状态
 */
enum OrderStatus {
  客户已下单,
  已出库,
  已收货
}

const getColumns = (that: OrderTable): ColumnProps<any>[] => {
  return [
    {
      ...commonTableDefaultProps,
      title: '序号',
      dataIndex: '',
      render: (text, row, index) => index + 1
    },
    {
      ...commonTableDefaultProps,
      title: '订单编号',
      dataIndex: 'orderInfo._id'
    },
    {
      ...commonTableDefaultProps,
      title: '商品名称',
      dataIndex: 'orderInfo.name'
    },
    {
      ...commonTableDefaultProps,
      title: '商品分类',
      dataIndex: 'orderInfo.sort',
      render: text =>
        text && that.props.sortList.length
          ? that.props.sortList.find(item => item._id === text).name
          : '--'
    },
    {
      ...commonTableDefaultProps,
      title: '商品数量',
      dataIndex: 'orderInfo.quantity'
    },
    {
      ...commonTableDefaultProps,
      title: '商品价格',
      dataIndex: 'orderInfo.price'
    },
    {
      ...commonTableDefaultProps,
      title: '应收金额',
      dataIndex: 'money',
      render: (text, row) => row.orderInfo.price * row.orderInfo.quantity
    },
    {
      ...commonTableDefaultProps,
      title: '客户姓名',
      dataIndex: 'userInfo.realName'
    },
    {
      ...commonTableDefaultProps,
      title: '客户手机号',
      dataIndex: 'userInfo.phone'
    },
    {
      ...commonTableDefaultProps,
      title: '收货地址',
      dataIndex: 'userInfo.address'
    },
    {
      ...commonTableDefaultProps,
      title: '订单状态',
      dataIndex: 'orderInfo.status',
      render: text => <Badge>{OrderStatus[text]}</Badge>
    },
    {
      ...commonTableDefaultProps,
      title: '下单时间',
      dataIndex: 'gmtCreate',
      render: text => renderDateColumn(text)
    },
    {
      ...commonTableDefaultProps,
      title: '操作',
      dataIndex: 'operator',
      render: (text, row) => (
        <ButtonGroup>
          <Button type="primary">发起出库</Button>
        </ButtonGroup>
      )
    }
  ];
};

const mapState = ({ ['sort']: state }: RematchRootState<Models>) => ({
  ...state
});
const mapDispatch = ({ ['sort']: dispatch }: RematchDispatch<Models>) => ({
  ...dispatch
});
interface Props
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>>,
    Basic.BaseProps {}

@connect(
  mapState,
  mapDispatch
)
export default class OrderTable extends Component<Props> {
  state = {
    orderList: []
  };
  componentWillMount() {
    this.props.queryList();
    this.queryOrderList();
  }
  async queryOrderList() {
    const { data, status } = await IndexService.queryOrder();
    if (status === 200 && data) {
      this.setState({ orderList: data });
    }
  }
  render() {
    // const {} = this.props;
    const { orderList } = this.state;
    return (
      <Fragment>
        <CommonTable
          columns={getColumns(this)}
          dataSource={orderList}
          rowKey={(row, index) => index.toString()}
          //   pageProps={{ total, page, size: 20 }}
        />
      </Fragment>
    );
  }
}
