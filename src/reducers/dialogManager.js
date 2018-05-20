import * as types from '../constants/actions';

const initialState = {
  taskCreatorOpen: false,
  taskEditorOpen: false,
  stepInfoOpen: false,
  invitationOpen: false,
  deleteTaskOpen: false,
  quitTaskOpen: false,
};

const dialogManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.TOGGLE_TASK_CREATOR:
      return { ...state, taskCreatorOpen: !state.taskCreatorOpen };
    case types.TOGGLE_TASK_EDITOR:
      return { ...state, taskEditorOpen: !state.taskEditorOpen };
    case types.TOGGLE_STEP_INFO:
      return { ...state, stepInfoOpen: !state.stepInfoOpen };
    case types.TOGGLE_INVITATION:
      return { ...state, invitationOpen: !state.invitationOpen };
    case types.TOGGLE_DELETE_TASK:
      return { ...state, deleteTaskOpen: !state.deleteTaskOpen };
    case types.TOGGLE_QUIT_TASK:
      return { ...state, quitTaskOpen: !state.quitTaskOpen };
    default:
      return state;
  }
};

export default dialogManager;
