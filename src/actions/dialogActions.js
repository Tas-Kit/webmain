import * as types from '../constants/actions';

export const toggleTaskInfo = () => ({
  type: types.TOGGLE_TASK_INFO,
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
