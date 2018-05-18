import * as types from '../constants/actions';

const setCurrentUser = (currentUser = {}) => ({
  type: types.SET_CURRENT_USER,
  currentUser,
});

export default {
  setCurrentUser,
};
