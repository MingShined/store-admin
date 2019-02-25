/**
 * @name 通用弹框
 * @author MingShined
 */
import React, { Component, Fragment } from 'react';
import { Basic } from 'src/types';
import { Modal, Button, Spin } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { ButtonProps } from 'antd/lib/button';

interface CommonModalProps extends Basic.BaseProps, Partial<ModalProps> {
  btnText?: string;
  afterCancel?: () => any;
  beforeOk?: () => any;
  btnProps?: ButtonProps;
  onClick?: () => void;
  loading?: boolean;
}

interface CommonModalState {
  visible: boolean;
  confirmLoading: boolean;
}

export default class CommonModal extends Component<
  CommonModalProps,
  CommonModalState
> {
  static defaultProps: Partial<CommonModalProps> = {
    btnText: '新增',
    loading: false
  };
  state = {
    visible: false,
    confirmLoading: false
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
      this.setState({ confirmLoading: true });
    }
    if (isOk) {
      this.setState({ confirmLoading: false });
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
    const { children, btnText, btnProps, loading } = this.props;
    const { visible, confirmLoading } = this.state;
    return (
      <Fragment>
        <Button type="primary" {...btnProps} onClick={this.handleClick}>
          {btnText}
        </Button>
        <Modal
          maskClosable
          destroyOnClose
          {...this.props}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          visible={visible}
          confirmLoading={confirmLoading}
        >
          <Spin spinning={loading}>{children}</Spin>
        </Modal>
      </Fragment>
    );
  }
}
