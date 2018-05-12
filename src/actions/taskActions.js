import * as types from '../constants/actions';

export const updateTaskInfo = (taskInfo = {}) => ({
  type: types.UPDATE_TASK_INFO,
  taskInfo,
});

export const resetTaskInfo = () => ({
  type: types.RESET_TASK_INFO,
});
