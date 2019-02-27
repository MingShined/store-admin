/**
 * @name 新增编辑分类弹窗
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import CommonForm from 'src/components/common-form';
import { FormDataProps } from 'src/components/common-form/type';
import { Input, message, InputNumber, Select } from 'antd';
import UploadImg from 'src/components/upload-img';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import IndexService from '../../service';
import CommonDrawer from 'src/components/common-modal/CommonDrawer';
import UploadImgList from 'src/components/upload-image-list';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import CommonService from 'src/services/CommonService';
import CommonSelect from 'src/components/common-select/CommonSelect';
import store, { connect, Models } from 'store';
import { RematchRootState, RematchDispatch } from '@rematch/core';

const editorProps = {
  height: 500,
  contentFormat: 'html',
  letterSpacings: [0, 0.28, 2, 4, 6],
  autoPlay: true,
  // onRawChange: this.handleRawChange,
  media: {
    allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
    image: true, // 开启图片插入功能
    // video: true, // 开启视频插入功能
    // audio: true, // 开启音频插入功能
    uploadFn: param => {
      CommonService.fileUpload({ data: { file: param.file } }).then(
        ({ data, status }) => {
          if (status === 200 && data) {
            message.success('图片上传成功');
            param.success({
              url: data
            });
          } else {
            // message.error('上传失败，请重新选择图片上传');
            param.error({
              msg: '上传失败，请重新选择图片上传'
            });
          }
        }
      );
    }
  }
};

const getFormData = (that: AddGoodModal): FormDataProps[] => {
  const goodValue: any = that.state.goodValue;
  const { isEdit, sortList } = that.props;
  return [
    {
      key: 'name',
      label: '名称',
      options: {
        rules: [{ required: true, message: '请输入名称' }],
        initialValue: isEdit ? goodValue.name : ''
      },
      node: <Input style={{ width: 300 }} />
    },
    {
      key: 'sort',
      label: '分类',
      options: {
        rules: [{ required: true, message: '请选择商品分类' }],
        initialValue: isEdit ? goodValue.sort : undefined
      },
      node: (
        <CommonSelect
          dataSource={sortList}
          style={{ width: 200 }}
          onRender={item => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          )}
        />
      )
    },
    {
      key: 'imgUrl',
      label: '商品图',
      options: {
        rules: [{ required: true, message: '请选择图片' }],
        initialValue: isEdit ? goodValue.imgUrl : ''
      },
      node: <UploadImg style={{ width: 100, height: 100 }} />
    },
    {
      key: 'bannerList',
      label: '轮播图',
      options: {
        rules: [{ required: true, message: '请选择轮播图片' }],
        initialValue: isEdit ? goodValue.bannerList : []
      },
      node: <UploadImgList type="simple" needRemove={true} />
    },
    {
      key: 'price',
      label: '价格',
      options: {
        rules: [{ required: true, message: '请输入价格' }],
        initialValue: isEdit ? goodValue.price : undefined
      },
      node: <InputNumber style={{ width: 150 }} min={0} />,
      extra: <span style={{ marginLeft: 20 }}>元</span>
    },
    {
      key: 'details',
      label: '描述',
      options: {
        rules: [{ required: true, message: '请输入价格' }],
        initialValue: isEdit
          ? BraftEditor.createEditorState(goodValue.details)
          : null
      },
      node: <BraftEditor {...editorProps} />
    }
  ];
};

const mapState = ({ ['good']: state }: RematchRootState<Models>) => ({ ...state });
const mapDispatch = ({ }: RematchDispatch<Models>) => ({ });
interface Props
extends Partial<ReturnType<typeof mapState>>,
Partial<ReturnType<typeof mapDispatch>>,
Basic.BaseProps {
  isEdit: boolean;
  id?: string;
}

@connect(
mapState,
mapDispatch
)
export default class AddGoodModal extends Component<Props> {
  form: WrappedFormUtils = null;
  state = {
    goodValue: {} as any,
    loading: false
  };
  handleFormatValue = () => {
    return new Promise((resolve, reject) => {
      this.form.validateFields((err, values) => {
        if (err) {
          message.error('请检查表单必填项');
          return;
        }
        const { details } = values;
        const result = {
          ...values,
          details: details.toHTML()
        };
        const isEdit = this.props.isEdit;
        const isClose = isEdit
          ? this.handleUpdate(result)
          : this.handleCreate(result);
        resolve(isClose);
      });
    });
  };
  handleCreate = async values => {
    const result = {
      ...values,
      bannerList: values.bannerList.map(item => item.url)
    };
    const { data, status } = await IndexService.createGood(result);
    if (status === 200 && data) {
      message.success('创建成功');
      store.dispatch.good.queryList();
      return true;
    }
    return false;
  };
  handleUpdate = async values => {
    const { data, status } = await IndexService.updateGood({
      ...this.state.goodValue,
      ...values
    });
    if (status === 200 && data) {
      message.success('编辑成功');
      store.dispatch.good.queryList();
      return true;
    }
    return false;
  };
  handleClick = async () => {
    const { isEdit, id } = this.props;
    if (!isEdit) {
      return;
    }
    this.setState({
      loading: true
    });
    const { data, status } = await IndexService.findGood(id);
    if (status && data) {
      const goodValue = { ...data, bannerList: data.bannerList.split(',') };
      this.setState({
        goodValue,
        loading: false
      });
    }
  };
  render() {
    const { isEdit } = this.props;
    const { loading } = this.state;
    return (
      <span style={{ marginBottom: 20 }}>
        <CommonDrawer
          btnText={isEdit ? '编辑' : '新增商品'}
          beforeOk={this.handleFormatValue}
          onClick={this.handleClick}
          loading={loading}
          placement="left"
          width="800"
        >
          <CommonForm
            rowProps={{ style: { marginTop: 15 } }}
            rowNum={1}
            btnProps={{ isResetBtn: false, isSubmitBtn: false }}
            formData={getFormData(this)}
            getForm={form => (this.form = form)}
            formItemProps={{ labelCol: { style: { width: 100 } } }}
          />
        </CommonDrawer>
      </span>
    );
  }
}