/**
 * @name 通用表格
 * @author MingShined
 */
import React, { Component } from 'react';
import { Table } from 'antd';
import { ColumnProps, TableProps, TableRowSelection } from 'antd/lib/table';
import { Basic } from 'src/types';
import { PaginationProps } from 'antd/lib/pagination';

interface PageProps {
  total: number;
  page: number;
  size?: number;
  style?: React.CSSProperties;
  showSizeChanger?: boolean;
}

interface CommonTableProps extends Basic.BaseProps, TableProps<any> {
  columns: ColumnProps<any>[];
  pageProps?: PageProps;
  onPageChange?: (page: number, pageSize?: number) => void;
  checkable?: boolean;
  rowSelectProps?: TableRowSelection<any>;
  onCheck?: (
    selectedRowKeys: string[] | number[],
    selectedRows: Object[]
  ) => void;
}

const getPageProps = (that: CommonTable): PaginationProps => {
  const { pageProps } = that.props;
  if (!pageProps) {
    return null;
  }
  const {
    pageProps: { total, page, size, style, showSizeChanger },
    onPageChange
  } = that.props;
  return {
    total,
    style,
    showSizeChanger,
    current: page + 1 || 1,
    defaultPageSize: size || 10,
    showQuickJumper: true,
    showTotal: (t, range) =>
      `共${total}条数据 第${page + 1}页 / 共${Math.ceil(
        total / (size || 10)
      )}页`,
    onChange: (pageValue, sizeValue) => {
      onPageChange(pageValue - 1, sizeValue);
    }
  };
};

const getRowSelection = (that: CommonTable): TableRowSelection<any> => {
  const { onCheck, rowSelectProps } = that.props;
  return {
    ...rowSelectProps,
    onChange: (selectedRowKeys, selectedRows) => {
      onCheck(selectedRowKeys, selectedRows);
    }
  };
};

export default class CommonTable extends Component<CommonTableProps> {
  static defaultProps: Partial<CommonTableProps> = {
    bordered: true
  };
  render() {
    return (
      <Table
        rowSelection={this.props.checkable && getRowSelection(this)}
        pagination={getPageProps(this)}
        {...this.props}
      />
    );
  }
}
