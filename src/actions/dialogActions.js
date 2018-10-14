// Trigger Build
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

export const toggleTaskCloner = () => ({
  type: types.TOGGLE_TASK_CLONER,
});

export const toggleStepCreator = () => ({
  type: types.TOGGLE_STEP_CREATOR,
});

export const toggleStepEditor = () => ({
  type: types.TOGGLE_STEP_EDITOR,
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

export const toggleTaskAppCreator = appId => ({
  type: types.TOGGLE_TASK_APP_CREATOR,
  appId,
});

export const toggleTaskAppPreview = appId => ({
  type: types.TOGGLE_TASK_APP_PREVIEW,
  appId,
});

export const toggleMiniAppPassword = () => ({
  type: types.TOGGLE_MINI_APP_PASSWORD,
});
