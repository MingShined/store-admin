/**
 * @name 轮播管理
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import PageLayout from 'src/components/page-layout';
import CommonForm from 'src/components/common-form';
import { FormDataProps } from 'src/components/common-form/type';
import UploadImgList from 'src/components/upload-image-list';
import IndexService from '../service';
import { message } from 'antd';

const getFormData = (that: BannerManage): FormDataProps[] => {
  return [
    {
      key: 'bannerList',
      label: '请上传图片',
      options: {
        initialValue: that.state.bannerList
      },
      node: <UploadImgList needRemove={true} type="simple" />
    }
  ];
};

interface Props extends Basic.BaseProps {}

export default class BannerManage extends Component<Props> {
  state = {
    bannerList: []
  };
  componentWillMount = () => {
    this.getBanner();
  };
  async getBanner() {
    const { data, status } = await IndexService.getBanner();
    if (status === 200 && data) {
      const bannerList = [];
      data.forEach(item => bannerList.push(item.imgUrl));
      this.setState({
        bannerList
      });
    }
  }
  handleUpload = async (err, values) => {
    let result = [];
    const bannerList = values.bannerList;
    if (bannerList.find(item => item.url)) {
      result = bannerList.map(item => item.url);
    } else {
      result = values;
    }
    const { data, status } = await IndexService.uploadBanner(result);
    if (status === 200 && data) {
      message.success('上传成功');
    }
  };
  render() {
    // const {} = this.props;
    // const {} = this.state;
    return (
      <PageLayout title="轮播管理">
        <CommonForm
          btnProps={{ place: 'start', submitText: '提交' }}
          formData={getFormData(this)}
          onSubmit={this.handleUpload}
          onReset={() => this.setState({ bannerList: [] })}
          rowNum={1}
          // formItemProps={{ labelCol: { style: { width: '200px' } } }}
        />
      </PageLayout>
    );
  }
}
