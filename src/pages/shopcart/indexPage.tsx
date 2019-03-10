/**
 * @name 购物车管理
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import PageLayout from 'src/components/page-layout';

interface Props extends Basic.BaseProps {}

export default class ShopcartManage extends Component<Props> {
  render() {
    // const {} = this.props;
    // const {} = this.state;
    return (
      <PageLayout title="购物车管理">
        <p>我是一个tsReact Demo</p>
      </PageLayout>
    );
  }
}
