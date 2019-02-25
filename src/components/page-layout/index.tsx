/**
 * @name 路由页组件
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

interface PageLayoutProps extends Basic.BaseProps, CardProps {}

export default class PageLayout extends Component<PageLayoutProps> {
  render() {
    const { children } = this.props;
    return (
      <Card headStyle={{ fontSize: 20 }} {...this.props}>
        {children}
      </Card>
    );
  }
}
