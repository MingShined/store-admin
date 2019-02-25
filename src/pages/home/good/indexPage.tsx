/**
 * @name 商品管理
 * @author MingShined
 */
import React, { Component } from 'react';
import { Basic } from 'src/types';
import PageLayout from 'src/components/page-layout';
import AddGoodModal from './modals/addGoodModal';
import GoodTable from './components/goodTable';
import IndexService from '../service';
import store from 'src/store';

interface Props extends Basic.BaseProps {}

export default class GoodManage extends Component<Props> {
  state = {
    sortList: []
  };
  componentWillMount() {
    store.dispatch.good.querySortList();
  }
  async queryGoodSortList() {
    const { data, status } = await IndexService.querySort();
    if (status === 200 && data) {
      this.setState({
        sortList: data
      });
    }
  }
  render() {
    // const {} = this.props;
    // const {} = this.state;
    return (
      <PageLayout title="商品管理">
        <div style={{ marginBottom: 20 }}>
          <AddGoodModal sortList={this.state.sortList} isEdit={false} />
        </div>
        <GoodTable sortList={this.state.sortList} />
      </PageLayout>
    );
  }
}
