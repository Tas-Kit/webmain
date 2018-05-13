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

export const addTask = (taskInfo = {}) => ({
  type: types.ADD_TASK,
  taskInfo,
});
