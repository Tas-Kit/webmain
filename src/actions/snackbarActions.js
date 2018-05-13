import * as types from '../constants/actions';

export const updateMessage = message => ({
  type: types.UPDATE_MESSAGE,
  message,
});

export const toggleSnackbar = () => ({
  type: types.TOGGLE_SNACKBAR,
});
