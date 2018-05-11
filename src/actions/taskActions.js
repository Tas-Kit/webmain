import * as types from '../constants/actions';

export const changeTaskName = name => ({
  type: types.CHANGE_TASK_NAME,
  name,
});
