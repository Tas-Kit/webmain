import * as types from '../constants/actions';

export const updateTaskInfo = (taskInfo = {}) => ({
  type: types.UPDATE_TASK_INFO,
  taskInfo,
});
