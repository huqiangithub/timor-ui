import { Effect } from 'dva';
import { Reducer } from 'redux';

import { queryDaily,updateDaily} from '@/services/daily';

const DailyModel: any = {
  namespace: 'daily',

  state: {
    dataSource: [],
  },

  effects: {
    *fetch(payload, { call, put }) {
      const response = yield call(queryDaily);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *update(payload, { call, put }) {
      console.log("update",payload)
      const response = yield call(updateDaily,payload.payload);
      yield put({
        type: 'fetch',
        payload: {},
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        dataSource: action.payload || [],
      };
    },
  },
};

export default DailyModel;
