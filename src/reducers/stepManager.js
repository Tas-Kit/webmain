import * as types from '../constants/actions';
import { STATUS } from '../constants';

const initialState = {
  stepId: null,
  stepInfo: {
    name: '',
    effortTime: '',
    effortUnit: '',
    deadline: '',
    status: STATUS[0],
    description: '',
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

const stepManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SEND_REQUEST: {
      return handleRequest(action.request, state);
    }
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    case types.UPDATE_STEP_INFO: {
      return { ...state, stepInfo: action.stepInfo };
    }
    case types.RESET_STEP_INFO: {
      return { ...state, stepInfo: initialState.stepInfo };
    }
    default:
      return state;
  }
};

export default stepManager;
