import * as types from '../constants/actions';

export const setCurrentUser = (currentUser = {}) => ({
  type: types.SET_CURRENT_USER,
  currentUser,
});

export const toggleEditMode = () => ({
  type: types.TOGGLE_EDIT_MODE,
});

export const resetEditMode = () => ({
  type: types.RESET_EDIT_MODE,
});
