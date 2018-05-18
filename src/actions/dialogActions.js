import * as types from '../constants/actions';

export const toggleTaskInfoCreator = () => ({
  type: types.TOGGLE_TASK_INFO_CREATOR,
});

export const toggleTaskInfoEditor = () => ({
  type: types.TOGGLE_TASK_INFO_EDITOR,
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
