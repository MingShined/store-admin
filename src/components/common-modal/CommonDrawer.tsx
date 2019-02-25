/**
 * @name 通用弹框
 * @author MingShined
 */
import React, { Component, Fragment } from 'react';
import { Basic } from 'src/types';
import { Drawer, Button, Spin } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { DrawerProps } from 'antd/lib/drawer';
import { TextAlignProperty } from 'csstype';

interface DrawerBtnProps {
  place?: TextAlignProperty;
  okText?: string;
  cancelText?: string;
}

interface CommonDrawerProps extends Basic.BaseProps, Partial<DrawerProps> {
  btnText?: string;
  afterCancel?: () => any;
  beforeOk?: () => any;
  btnProps?: ButtonProps;
  onClick?: () => void;
  loading?: boolean;
  confirmLoading?: boolean;
  drawerBtnProps?: DrawerBtnProps;
}

interface CommonDrawerState {
  visible: boolean;
}

export default class CommonDrawer extends Component<
  CommonDrawerProps,
  CommonDrawerState
> {
  static defaultProps: Partial<CommonDrawerProps> = {
    btnText: '新增',
    loading: false
  };
  drawerBtnProps: DrawerBtnProps = {
    place: 'right',
    okText: '确定',
    cancelText: '取消'
  };
  state = {
    visible: false
  };
  handleCancel = () => {
    const { afterCancel } = this.props;
    this.toggleVisible(false);
    if (afterCancel) {
      afterCancel();
    }
  };
  handleOk = async () => {
    if (!this.props.beforeOk) {
      this.handleCancel();
      return;
    }
    const isOk = await this.props.beforeOk();
    if (isOk) {
      this.handleCancel();
    }
  };
  handleClick = async () => {
    if (this.props.onClick) {
      await this.props.onClick();
    }
    this.toggleVisible(true);
  };
  toggleVisible = (visible: boolean) => {
    this.setState({ visible });
  };
  render() {
    const {
      children,
      btnText,
      btnProps,
      loading,
      confirmLoading,
      drawerBtnProps
    } = this.props;
    const visible = this.state.visible;
    const { place, okText, cancelText } = {
      ...this.drawerBtnProps,
      ...drawerBtnProps
    };
    return (
      <Fragment>
        <Button type="primary" {...btnProps} onClick={this.handleClick}>
          {btnText}
        </Button>
        <Drawer
          maskClosable
          destroyOnClose
          {...this.props}
          onClose={this.handleCancel}
          visible={visible}
        >
          <Spin spinning={loading}>{children}</Spin>
          <div
            className="drawerFooter"
            style={{
              textAlign: place
            }}
          >
            <Button
              style={{ marginRight: 8 }}
              onClick={this.handleCancel}
              type="danger"
            >
              {cancelText}
            </Button>
            <Button
              type="primary"
              onClick={this.handleOk}
              loading={confirmLoading}
            >
              {okText}
            </Button>
          </div>
        </Drawer>
      </Fragment>
    );
  }
}
