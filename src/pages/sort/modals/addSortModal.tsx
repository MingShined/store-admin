/**
 * @name 新增编辑分类弹窗
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import CommonModal from 'src/components/common-modal';
import CommonForm from 'src/components/common-form';
import { FormDataProps } from 'src/components/common-form/type';
import { Input, message } from 'antd';
import UploadImg from 'src/components/upload-img';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import IndexService from '../../service';

const getFormData = (that: AddSortModal): FormDataProps[] => {
  const sortValue: any = that.state.sortValue;
  const isEdit = that.props.isEdit;
  return [
    {
      key: 'name',
      label: '名称',
      options: {
        rules: [{ required: true, message: '请输入名称' }],
        initialValue: isEdit ? sortValue.name : ''
      },
      node: <Input />
    },
    {
      key: 'imgUrl',
      label: '图片',
      options: {
        rules: [{ required: true, message: '请选择图片' }],
        initialValue: isEdit ? sortValue.imgUrl : ''
      },
      node: <UploadImg style={{ width: 100, height: 100 }} />
    }
  ];
};

interface Props extends Basic.BaseProps {
  isEdit: boolean;
  id?: string;
  onSuccess: () => void;
}

export default class AddSortModal extends Component<Props> {
  form: WrappedFormUtils = null;
  state = {
    sortValue: {} as any,
    loading: false
  };
  handleFormatValue = () => {
    return new Promise((resolve, reject) => {
      this.form.validateFields((err, values) => {
        if (err) {
          message.error('请检查表单必填项');
          return;
        }
        const isEdit = this.props.isEdit;
        const result = isEdit
          ? this.handleUpdate(values)
          : this.handleCreate(values);
        resolve(result);
      });
    });
  };
  handleCreate = async values => {
    const { data, status } = await IndexService.createSort(values);
    if (status === 200 && data) {
      message.success('创建成功');
      this.props.onSuccess();
      return true;
    }
    return false;
  };
  handleUpdate = async values => {
    const { data, status } = await IndexService.updateSort({
      ...this.state.sortValue,
      ...values
    });
    if (status === 200 && data) {
      message.success('编辑成功');
      this.props.onSuccess();
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
    const { data, status } = await IndexService.findSort(id);
    if (status && data) {
      this.setState({
        sortValue: data[0],
        loading: false
      });
    }
  };
  render() {
    const { isEdit } = this.props;
    const { loading } = this.state;
    return (
      <span style={{ marginBottom: 20 }}>
        <CommonModal
          btnText={isEdit ? '编辑' : '新增分类'}
          beforeOk={this.handleFormatValue}
          onClick={this.handleClick}
          loading={loading}
        >
          <CommonForm
            rowProps={{ style: { marginTop: 15 } }}
            rowNum={1}
            btnProps={{ isResetBtn: false, isSubmitBtn: false }}
            formData={getFormData(this)}
            getForm={form => (this.form = form)}
          />
        </CommonModal>
      </span>
    );
  }
}
