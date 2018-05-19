import * as types from '../constants/actions';

export const toggleTaskCreator = () => ({
  type: types.TOGGLE_TASK_CREATOR,
});

export const toggleTaskEditor = () => ({
  type: types.TOGGLE_TASK_EDITOR,
});

export const toggleStepInfo = () => ({
  type: types.TOGGLE_STEP_INFO,
});

export const toggleInvitation = () => ({
  type: types.TOGGLE_INVITATION,
});

export const toggleDeleteTask = () => ({
  type: types.TOGGLE_DELETE_TASK,
});
