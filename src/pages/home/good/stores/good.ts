/**
 * @name 
 */
import _ from 'lodash';
import IndexService from '../../service';

const initState = {
  /**
   * @name 搜索条件
   */
  searchParams: {
    page: 0,
    size: 10,
  } as any,
  /**
   * @name 列表
   */
  goodList: [],
  /**
   * @name 列表总条数
   */
  total: 0,
  sortList: []
};
type State = Partial<typeof initState>;

const getInitState = (): State => {
  return _.cloneDeep(initState);
};

const good = {
  state: getInitState(),
  reducers: {
    /**
     * @name 初始化
     */
    resetState() {
      return getInitState();
    },
    /**
     * @name 更新state
     */
    updateState(state: State, payload: State) {
      return { ...state, ...payload };
    },
    /**
     * @name 更新搜索条件
     */
    updateSearchParams(state: State, payload: State) {
      return { ...state, searchParams: { ...state.searchParams, ...payload } };
    }
  },
  effects: dispatch => ({
    /**
     * @name 获取列表
     * @param payload
     * @param rootState
     */
    async queryList(payload?, rootState?) {
      dispatch.good.updateSearchParams(payload);
      const { searchParams } = rootState.good;
      const params = { ...searchParams, ...payload };
      const { data, status, total } = await IndexService.queryGood(params);
      if (status === 200 && data) {
        dispatch.good.updateState({ total, goodList: data });
      }
    },
    async querySortList(payload?, rootState?) {
      const { data, status } = await IndexService.querySort();
      if (status === 200 && data) {
        dispatch.good.updateState({ sortList: data });
      }
    }
  })
};
export default good;
