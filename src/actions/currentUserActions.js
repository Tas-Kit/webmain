import * as types from '../constants/actions';

const setCurrentUser = (currentUser = {}) => ({
  type: types.SET_CURRENT_USER,
  currentUser,
});

const toggleEditMode = () => ({
  type: types.TOGGLE_EDIT_MODE,
});

export default {
  setCurrentUser,
  toggleEditMode,
};
