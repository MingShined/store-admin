import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import { checkFile } from 'src/utils/utils';
export interface UploadImgListProps {
  style?: React.CSSProperties;
  onChange?: (values: string[] | UploadFile[]) => void;
  value?: string[];
  max?: number;
  action?: string;
  type?: 'simple' | 'default';
  size?: number;
  width?: number;
  height?: number;
  needRemove?: boolean;
  disabled?: boolean;
}

export default class UploadImgList extends React.Component<UploadImgListProps> {
  static defaultProps: UploadImgListProps = {
    action: '/api/upload',
    type: 'default'
  };
  state = {
    fileList: [],
    previewVisible: false,
    previewImage: ''
  };
  constructor(props) {
    super(props);
    this.state.fileList =
      props.value && Array.isArray(props.value)
        ? props.value.map((item, index) => {
            let uid = index;
            if (this.state.fileList[index]) {
              uid = this.state.fileList[index].uid;
            }
            return {
              uid,
              status: 'done',
              url: item
            };
          })
        : [];
  }
  handlePreview = (file: UploadFile) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  handleRemove = file => {
    // tslint:disable-next-line:no-console
    // console.log(file);

    this.props.onChange(
      this.state.fileList
        .filter(item => item.uid !== file.uid)
        .map(item => item.url)
    );
    return false;
    // this.setState({ fileList: this.state.fileList.filter(item => item.uid !== file.uid) });
    //
  };
  handleChange = (file: UploadChangeParam) => {
    if (file.file.status === 'done') {
      file.fileList[file.fileList.length - 1].url = file.file.response;
      if (this.props.type === 'simple') {
        this.props.onChange(file.fileList.map(item => item.url));
      } else {
        this.props.onChange(file.fileList);
      }
      message.success('选择成功！');
    }
    if (file.file.status === 'error') {
      message.error('上传失败请重新尝试');
      file.fileList = file.fileList.filter(item => item.status === 'done');
    }
    this.setState({ fileList: file.fileList });
  };
  handleCancel = () => this.setState({ previewVisible: false });
  handleBeforeUpload = (file: UploadFile & File, FileList: UploadFile[]) => {
    {
      const { size, width, height, onChange } = this.props;
      return new Promise((resolve, reject) => {
        checkFile({
          file,
          size: size || 2084,
          width: width || null,
          height: height || null,
          accept: 'image'
        })
          .then(imgAttr => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    }
  };
  reset = () => {
    this.setState({
      fileList: [],
      previewVisible: false,
      previewImage: ''
    });
  };
  componentWillReceiveProps(nextProps: UploadImgListProps) {
    if (nextProps.value && Array.isArray(nextProps.value)) {
      if (nextProps.type === 'simple') {
        // nextProps.value.length!=
        this.setState({
          fileList: nextProps.value.map((item, index) => {
            let uid = index;
            if (this.state.fileList[index]) {
              uid = this.state.fileList[index].uid;
            }
            return {
              uid,
              status: 'done',
              url: item
            };
          })
        });
      } else {
        this.setState({
          fileList: nextProps.value
        });
      }
    }
  }
  render() {
    const { fileList, previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          ...this.props.style
        }}
      >
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const config = {
      onPreview: this.handlePreview
    };
    if (this.props.needRemove) {
      config[`onRemove`] = this.handleRemove;
    }
    return (
      <div className="clearfix">
        <Upload
          action={this.props.action}
          disabled={this.props.disabled}
          // beforeUpload={this.handleBeforeUpload}
          // headers={{ Authorization: `Bearer ${getToken()}` }}
          listType="picture-card"
          fileList={this.state.fileList}
          {...config}
          onChange={this.handleChange}
          beforeUpload={(file: any) => this.handleBeforeUpload(file, fileList)}
        >
          {this.props.max && fileList.length >= this.props.max
            ? null
            : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
