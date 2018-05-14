import * as types from '../constants/actions';

const initialState = {
  open: false,
  message: '',
};

const snackbarManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.UPDATE_MESSAGE:
      return { ...state, message: action.message, open: true };
    case types.TOGGLE_SNACKBAR:
      return { ...state, open: false };
    default:
      return state;
  }
};

export default snackbarManager;
