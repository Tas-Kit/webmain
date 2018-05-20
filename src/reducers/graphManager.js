import * as types from '../constants/actions';

const initialState = {
  draggingIndex: -1,
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

const graphManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SEND_REQUEST: {
      return handleRequest(action.request, state);
    }
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    case types.SET_DRAGGING_INDEX: {
      return { ...state, draggingIndex: action.index };
    }
    default:
      return state;
  }
};

export default graphManager;
