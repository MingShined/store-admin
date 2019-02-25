import React, { Component } from 'react';
import styles from './index.less';
import { Upload, Tooltip, Icon, message } from 'antd';
import _ from 'lodash';
import { UploadFile } from 'antd/lib/upload/interface';
import { checkFile } from 'src/utils/utils';
import CommonService from 'src/services/CommonService';

export interface UploadImagePops {
  style?: React.CSSProperties;
  onChange?: Function;
  size?: number;
  width?: number;
  height?: number;
  value?: string;
  reminder?: string;
  tipTitle?: string;
  imgTitle?: string;
  disabled?: boolean;
  onImgAttr?: Function;
  fileUpload?: Function;
}

class UploadImg extends Component<UploadImagePops> {
  static defaultProps: UploadImagePops = {
    tipTitle: '点击上传图片',
    imgTitle: '点击上传'
  };
  img: HTMLImageElement;
  state = {
    loading: false
  };
  constructor(props) {
    super(props);
  }
  beforeUpload = (file: UploadFile & File, FileList: UploadFile[]): boolean => {
    const { size, width, height, onChange } = this.props;
    checkFile({
      file,
      size: size || 2084,
      width: width || null,
      height: height || null,
      accept: 'image'
    }).then((imgAttr) => {
      if (this.props.onImgAttr) {
        this.props.onImgAttr(imgAttr);
      }
      this.setState({
        loading: true
      });
      if (this.props.fileUpload) {
        this.props.fileUpload(file);
        this.setState({
          loading: false
        });
      } else {
        // console.log(file);
        return CommonService.fileUpload({
          data: { file }
        }).then(({ data, status }) => {
          this.setState({
            loading: false
          });
          if (status === 200) {
            message.success('图片上传成功');
            // this.setState({ picUrl: data.ossUrl });
            if (onChange) {
              onChange(data);
            }
          } else {
            message.error('上传失败，请重新选择图片上传');
          }
        });
      }
    });

    return false;
  };

  render() {
    const { style, value, reminder, imgTitle } = this.props;
    const uploadButton = (
      <div style={{ minHeight: '80px', padding: '20px 0', ...this.props.style }}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">{imgTitle}</div>
      </div>
    );
    return (
      <Upload
        action=""
        style={{ margin: '0', padding: '0' }}
        listType="picture-card"
        showUploadList={false}
        disabled={this.props.disabled}
        beforeUpload={(file: any, fileList) => this.beforeUpload(file, fileList)}
      >
        <Tooltip placement="rightTop" title={this.props.tipTitle}>
          {value ? (
            <img
              ref={(dom) => (this.img = dom)}
              src={value}
              alt=""
              title="(图片格式:*，不超过1M)"
              className={styles.imgSize}
              style={style}
            />
          ) : (
            uploadButton
          )}
        </Tooltip>
      </Upload>
    );
  }
}

export default UploadImg;
