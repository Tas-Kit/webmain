import * as types from '../constants/actions';

export const updateTaskInfo = (taskInfo = {}) => ({
  type: types.UPDATE_TASK_INFO,
  taskInfo,
});

export const resetTaskInfo = () => ({
  type: types.RESET_TASK_INFO,
});

export const setActiveTaskId = taskId => ({
  type: types.SET_ACTIVE_TASK_ID,
  taskId,
});

export const toggleTaskActionPending = () => ({
  type: types.TOGGLE_TASK_ACTION_PENDING,
});

export const toggleTaskDeletePending = () => ({
  type: types.TOGGLE_TASK_DELETE_PENDING,
});

export const toggleTaskQuitPending = () => ({
  type: types.TOGGLE_TASK_QUIT_PENDING,
});

export const toggleTaskSavePending = () => ({
  type: types.TOGGLE_TASK_SAVE_PENDING,
});

export const setUserRole = (userId, role) => ({
  type: types.SET_USER_ROLE,
  userId,
  role,
});

export const setUserSuperRole = (userId, superRole) => ({
  type: types.SET_USER_SUPER_ROLE,
  userId,
  superRole,
});

export const removeUser = userId => ({
  type: types.REMOVE_USER,
  userId,
});

export const setTaskInfoOrigin = taskInfo => ({
  type: types.SET_TASK_INFO_ORIGIN,
  taskInfo,
});
