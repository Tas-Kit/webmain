import * as types from '../constants/actions';

const initialState = {
  taskInfoOpen: false,
  stepInfoOpen: false,
};

const dialogManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.TOGGLE_TASK_INFO:
      return { ...state, taskInfoOpen: !state.taskInfoOpen };
    case types.TOGGLE_STEP_INFO:
      return { ...state, stepInfoOpen: !state.stepInfoOpen };
    default:
      return state;
  }
};

export default dialogManager;
