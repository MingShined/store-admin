/**
 * @name 商品列表
 * @author MingShined
 */
import React, { Component, Fragment } from 'react';
import { Basic } from 'src/types';
import { ColumnProps } from 'antd/lib/table';
import {
  commonTableDefaultProps,
  renderEnumColumn,
  renderDateColumn
} from 'src/components/common-table/uitls';
import CommonTable from 'src/components/common-table';
import store, { connect, Models } from 'store';
import { RematchRootState, RematchDispatch } from '@rematch/core';
import ButtonGroup from 'antd/lib/button/button-group';
import { Button, Modal, message, Badge } from 'antd';
import AddGoodModal from '../modals/addGoodModal';
import IndexService from '../../service';

const getColumns = (that: GoodTable): ColumnProps<any>[] => {
  return [
    {
      ...commonTableDefaultProps,
      title: '序号',
      dataIndex: '',
      render: (text, row, index) => index + 1
    },
    { ...commonTableDefaultProps, title: '名称', dataIndex: 'name' },
    {
      ...commonTableDefaultProps,
      title: '分类',
      dataIndex: 'sort',
      render: text =>
        that.props.sortList.length ?
        that.props.sortList.find(item => item._id === text).name : '--'
    },
    { ...commonTableDefaultProps, title: '商品图', dataIndex: 'imgUrl' },
    { ...commonTableDefaultProps, title: '价格', dataIndex: 'price' },
    {
      ...commonTableDefaultProps,
      title: '状态',
      dataIndex: 'status',
      render: text => (
        <Badge
          status={text ? 'success' : 'error'}
          text={text ? '上架' : '下架'}
        />
      )
    },
    {
      ...commonTableDefaultProps,
      title: '操作',
      dataIndex: 'operator',
      render: (text, row, index) => (
        <ButtonGroup>
          <AddGoodModal isEdit={true} id={row._id} />
          <Button type="danger" onClick={() => that.handleDelete(row._id)}>
            删除
          </Button>
        </ButtonGroup>
      )
    }
  ];
};

const mapState = ({ ['good']: state, loading }: RematchRootState<Models>) => ({
  ...state,
  loading: loading.effects.good.queryList
});
const mapDispatch = ({ ['good']: dispatch }: RematchDispatch<Models>) => ({
  ...dispatch
});
interface Props
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>>,
    Basic.BaseProps {}

@connect(
  mapState,
  mapDispatch
)
export default class GoodTable extends Component<Props> {
  componentWillMount() {
    this.props.queryList();
  }
  handleChangePage = (page, size) => {
    this.props.queryList({ page, size });
  };
  handleDelete = id => {
    Modal.confirm({
      content: '您确定删除吗？',
      maskClosable: true,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        const { data, status } = await IndexService.deleteGood(id);
        if (status === 200) {
          message.success('删除成功');
          this.props.queryList();
        }
      }
    });
  };
  render() {
    const {
      goodList,
      total,
      searchParams: { page, size },
      loading
    } = this.props;
    // const {} = this.state;
    return (
      <Fragment>
        <CommonTable
          loading={loading}
          columns={getColumns(this)}
          dataSource={goodList}
          rowKey={(row, index) => index.toString()}
          pageProps={{ total, page, size }}
          onPageChange={this.handleChangePage}
        />
      </Fragment>
    );
  }
}
