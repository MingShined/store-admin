/**
 * @name 左右排列布局
 * @author MingShined
 */
import React, { Component, Fragment } from 'react';
import { Basic } from 'src/types';
import { Row, Col } from 'antd';

interface FlexTableLayoutPropsColProps {
  leftCol: number;
  rightCol: number;
}

interface FlexTableLayoutProps extends Basic.BaseProps {
  title: any;
  colProps?: FlexTableLayoutPropsColProps;
  rowStyle?: React.CSSProperties;
}

export default class FlexTableLayout extends Component<FlexTableLayoutProps> {
  static defaultProps: Partial<FlexTableLayoutProps> = {
    colProps: {
      leftCol: 3,
      rightCol: 21
    }
  };
  render() {
    const { title, children, colProps, rowStyle } = this.props;
    const defaultRowStyle = { border: '1px solid #ddd' };
    // const {} = this.state;
    return (
      <Row style={{ ...defaultRowStyle, ...rowStyle }} type="flex">
        <Col
          span={colProps.leftCol}
          style={{
            borderRight: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f3f3'
          }}
        >
          {title}
        </Col>
        <Col span={colProps.rightCol}>{children}</Col>
      </Row>
    );
  }
}
