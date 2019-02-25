import React, { CSSProperties } from 'react';
import { Card, Icon } from 'antd';
import PageHeaderLayout from 'src/layouts/PageHeaderLayout';
import { Bind } from 'lodash-decorators/bind';
import styles from './imageBox.less';
import UploadImg from 'src/components/UploadImg';
import BaseProps from 'src/declare/baseProps';
import { downloadRequest } from 'src/utils/request';

interface BaseValue {
  url: string;
  smallImageWidth?: number;
  smallImageHeight?: number;
  isEdit: boolean;
  imgStyle?: CSSProperties;
  onChange: Function;
  imgTitle?: string;
}
export default class ImageBox extends React.Component<
  BaseProps & BaseValue
> {
  @Bind()
  readPic(url) {
    if (!url) {
      return '';
    }
    let smallImageWidth = 320;
    let smallImageHeight = 240;
    if (this.props.smallImageWidth) {
      smallImageWidth = this.props.smallImageWidth;
    }
    if (this.props.smallImageHeight) {
      smallImageHeight = this.props.smallImageHeight;
    }
    return (
      url +
      '?x-oss-process=image/resize,h_' +
      smallImageHeight +
      ',w_' +
      smallImageWidth
    );
  }
  @Bind()
  showImage(url) {
    const imgUrl = url;
    const imgModalShow = true;
    const imgRotate = 0;
    this.props.onChange({
      imgUrl,
      imgModalShow,
      imgRotate
    });
  }
  @Bind()
  download(url) {
    location.href = url;
    // downloadRequest(url);
  }
  @Bind()
  setStates(url) {
    const { type } = this.props;
    this.props.onChange({
      type,
      url
    });
  }
  render() {
    const { url, isEdit, imgStyle, imgTitle } = this.props;
    return (
      <div className={styles.imageBox}>
        {url &&
          !isEdit && (
            <img
              alt="example"
              style={imgStyle}
              src={this.readPic(url)}
            />
          )}
        {url &&
          !isEdit && (
            <div className={styles.tool}>
              <Icon
                type="eye-o"
                onClick={() => this.showImage(url)}
                className={styles.icon}
                title="点击查看大图"
              />
              <Icon
                type="download"
                onClick={() => this.download(url)}
                className={styles.icon}
                title="保存图片"
              />
            </div>
          )}
        {isEdit && (
          <UploadImg
            style={imgStyle}
            imgTitle={imgTitle}
            value={this.readPic(url)}
            onChange={val => this.setStates(val)}
          />
        )}
      </div>
    );
  }
}
