import * as types from '../constants/actions';

const initialState = {
  name: '',
};

const handleRequest = (request, state) => {
  switch (request.type) {
    default:
      return state;
  }
};

const handleResponse = (response, state) => {
  switch (response.type) {
    default:
      return state;
  }
};

const taskManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SEND_REQUEST: {
      return handleRequest(action.request, state);
    }
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    case types.CHANGE_TASK_NAME: {
      return { ...state, name: action.name };
    }
    default:
      return state;
  }
};

export default taskManager;
