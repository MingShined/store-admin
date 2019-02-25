/**
 * @name 通用loading按钮
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import Button, { ButtonProps } from 'antd/lib/button';

interface Props extends Basic.BaseProps {
  btnProps?: ButtonProps;
  btnText?: string;
  onClick: () => any;
}

export default class LoadingButton extends Component<Props> {
  state = {
    loading: false
  };
  handleClick = async () => {
    this.setState({
      loading: true
    });
    if (!this.props.onClick) {
      this.setState({ loading: false });
      return;
    }
    const loading = await this.props.onClick();
    this.setState({ loading });
  };
  render() {
    const { btnProps, btnText } = this.props;
    const { loading } = this.state;
    return (
      <Button {...btnProps} loading={loading} onClick={this.handleClick}>
        {btnText}
      </Button>
    );
  }
}
