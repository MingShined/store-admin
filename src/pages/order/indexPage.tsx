/**
 * @name 购物车管理
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import PageLayout from 'src/components/page-layout';
import OrderTable from './components/orderTable';

interface Props extends Basic.BaseProps {}

export default class OrderManage extends Component<Props> {
  render() {
    // const {} = this.props;
    // const {} = this.state;
    return (
      <PageLayout title="订单管理">
        <OrderTable />
      </PageLayout>
    );
  }
}
