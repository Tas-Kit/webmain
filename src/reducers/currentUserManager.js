import * as types from '../constants/actions';

const initialState = {
  username: '',
  first_name: '',
  last_name: '',
  uid: '',
  email: '',
};

const handleRequest = (request, state) => {
  switch (request.type) {
    default:
      return state;
  }
};

const handleResponse = (response, state) => {
  switch (response.type) {
    case 'get_current_user':
      return { ...response.json };
    default:
      return state;
  }
}

const currentUserManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SEND_REQUEST: {
      return handleRequest(action.request, state);
    }
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    case types.SET_CURRENT_USER: {
      return { ...action.currentUser };
    }
    default:
      return state;
  }
};

export default currentUserManager;
