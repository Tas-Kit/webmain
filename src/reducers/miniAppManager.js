import * as types from '../constants/actions';
import * as apiTypes from '../constants/apiTypes';

const initialState = {
  miniAppList: [],
};

const handleResponse = (response, state) => {
  switch (response.type) {
    case apiTypes.GET_MINI_APP_LIST: {
      const { mini_apps: list } = response.json;
      return { ...state, miniAppList: list };
    }
    default:
      return state;
  }
};

const miniAppManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    default:
      return state;
  }
};

export default miniAppManager;
