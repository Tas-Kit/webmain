import * as types from '../constants/actions';

const initialState = {
  taskInfoOpen: false,
};

const dialogManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.TOGGLE_FORM_DIALOG:
      return { ...state, taskInfoOpen: !state.taskInfoOpen };
    default:
      return state;
  }
};

export default dialogManager;
