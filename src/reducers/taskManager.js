import * as types from '../constants/actions';
import { STATUS } from '../constants';

const initialState = {
  taskId: null,
  taskInfo: {
    name: '',
    status: STATUS[0],
    roles: [],
    description: '',
    deadline: '',
    effortTime: '',
    effortUnit: '',
  },
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
    case types.UPDATE_TASK_INFO: {
      return { ...state, taskInfo: action.taskInfo };
    }
    case types.RESET_TASK_INFO: {
      return { ...state, taskInfo: initialState.taskInfo };
    }
    default:
      return state;
  }
};

export default taskManager;
