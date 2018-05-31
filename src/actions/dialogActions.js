import * as types from '../constants/actions';

export const toggleTaskCreator = () => ({
  type: types.TOGGLE_TASK_CREATOR,
});

export const toggleTaskEditor = () => ({
  type: types.TOGGLE_TASK_EDITOR,
});

export const toggleTaskViewer = () => ({
  type: types.TOGGLE_TASK_VIEWER,
});

export const toggleStepCreator = () => ({
  type: types.TOGGLE_STEP_CREATOR,
});

export const toggleStepViewer = () => ({
  type: types.TOGGLE_STEP_VIEWER,
});

export const toggleInvitation = () => ({
  type: types.TOGGLE_INVITATION,
});

export const toggleDeleteTask = () => ({
  type: types.TOGGLE_DELETE_TASK,
});

export const toggleQuitTask = () => ({
  type: types.TOGGLE_QUIT_TASK,
});
