import React, { Component } from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export default class PageFooterLayout extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        <p>Copyright@Lemmon</p>
      </Footer>
    );
  }
}
