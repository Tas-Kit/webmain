import * as types from '../constants/actions';
import * as apiTypes from '../constants/apiTypes';

const initialState = {
  username: 'user',
  firstName: '',
  lastName: '',
  uid: '',
  email: '',
  editMode: false,
  platformRootKey: null,
};

const handleRequest = (request, state) => {
  switch (request.type) {
    default:
      return state;
  }
};

const handleResponse = (response, state) => {
  switch (response.type) {
    case 'get_current_user': {
      const { first_name: firstName, last_name: lastName } = response.json;
      return {
        ...state,
        ...response.json,
        firstName,
        lastName,
      };
    }
    case apiTypes.AUTHENTICATE_USER: {
      const { platform_root_key: platformRootKey } = response.json;
      return {
        ...state,
        platformRootKey,
      };
    }
    default:
      return state;
  }
};

const currentUserManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SEND_REQUEST: {
      return handleRequest(action.request, state);
    }
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    case types.SET_CURRENT_USER: {
      return { ...state, ...action.currentUser };
    }
    case types.TOGGLE_EDIT_MODE: {
      return { ...state, editMode: !state.editMode };
    }
    case types.RESET_EDIT_MODE: {
      return { ...state, editMode: false };
    }
    default:
      return state;
  }
};

export default currentUserManager;
