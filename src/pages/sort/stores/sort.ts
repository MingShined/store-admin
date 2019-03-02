/**
 * @name 分类管理
 */
import _ from 'lodash';
import IndexService from '../../service';

const initState = {
  /**
   * @name 搜索条件
   */
  searchParams: {
    page: 0,
    size: 20,
    sort: 'id,DESC'
  } as any,
  /**
   * @name 分类列表
   */
  sortList: [],
  /**
   * @name 列表总条数
   */
  total: 0
};
type State = Partial<typeof initState>;

const getInitState = (): State => {
  return _.cloneDeep(initState);
};

const sort = {
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
     * @name 获取分类列表
     * @param payload
     * @param rootState
     */
    async queryList(payload?, rootState?) {
      dispatch.sort.updateSearchParams(payload);
      const { searchParams } = rootState.sort;
      const params = { ...searchParams, ...payload };
      const { data, status, total } = await IndexService.querySort();
      if (status === 200 && data) {
        dispatch.sort.updateState({ total, sortList: data });
      }
    }
  })
};
export default sort;
