/**
 * @name 分类管理
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import PageLayout from 'src/components/page-layout';

import Table, { ColumnProps } from 'antd/lib/table';
import {
  commonTableDefaultProps,
  renderEnumColumn,
  renderDateColumn
} from 'src/components/common-table/uitls';
import AddSortModal from './modals/addSortModal';
import ButtonGroup from 'antd/lib/button/button-group';
import { Button, message, Modal } from 'antd';
import IndexService from '../service';

const getColumns = (that: SortManage): ColumnProps<any>[] => {
  return [
    {
      ...commonTableDefaultProps,
      title: '序号',
      dataIndex: '',
      render: (text, row, index) => index + 1
    },
    { ...commonTableDefaultProps, title: '名称', dataIndex: 'name' },
    { ...commonTableDefaultProps, title: '图片', dataIndex: 'imgUrl' },
    {
      ...commonTableDefaultProps,
      title: '操作',
      dataIndex: 'operator',
      render: (text, row, index) => (
        <ButtonGroup>
          <AddSortModal
            onSuccess={() => that.queryList()}
            id={row._id}
            isEdit={true}
          />
          <Button onClick={() => that.handleDelete(row._id)}>删除</Button>
        </ButtonGroup>
      )
    }
  ];
};

interface Props extends Basic.BaseProps {}

export default class SortManage extends Component<Props> {
  state = {
    dataSource: []
  };
  componentWillMount() {
    this.queryList();
  }
  async queryList() {
    const { data, status } = await IndexService.querySort();
    if (status === 200 && data) {
      this.setState({
        dataSource: data
      });
    }
  }
  handleDelete = id => {
    Modal.confirm({
      content: '您确定删除吗?',
      okText: '确定',
      cancelText: '取消',
      maskClosable: true,
      onOk: async () => {
        const { status } = await IndexService.deleteSort(id);
        if (status === 200) {
          message.success('删除成功');
          this.queryList();
        }
      }
    });
  };
  render() {
    const { dataSource } = this.state;
    return (
      <PageLayout title="分类管理">
        <div style={{ marginBottom: 20 }}>
          <AddSortModal onSuccess={() => this.queryList()} isEdit={false} />
        </div>
        <Table
          columns={getColumns(this)}
          dataSource={dataSource || []}
          rowKey={(row, index) => index.toString()}
          bordered
        />
      </PageLayout>
    );
  }
}
