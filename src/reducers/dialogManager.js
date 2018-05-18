import * as types from '../constants/actions';

const initialState = {
  taskInfoOpen: false,
  stepInfoOpen: false,
  invitationOpen: false,
  deleteTaskOpen: false,
};

const dialogManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.TOGGLE_TASK_INFO:
      return { ...state, taskInfoOpen: !state.taskInfoOpen };
    case types.TOGGLE_STEP_INFO:
      return { ...state, stepInfoOpen: !state.stepInfoOpen };
    case types.TOGGLE_INVITATION:
      return { ...state, invitationOpen: !state.invitationOpen };
    case types.TOGGLE_DELETE_TASK:
      return { ...state, deleteTaskOpen: !state.deleteTaskOpen };
    default:
      return state;
  }
};

export default dialogManager;
