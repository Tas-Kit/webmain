import React from 'react';
import { Select, MenuItem } from '../../node_modules/@material-ui/core';
import { SUPER_ROLE } from '../constants';

const TaskSelect = (props) => {
  const {
    tasks, currentTaskId, handleSelectChange, ...rest
  } = props;
  return (
    <Select value={currentTaskId || ''} onChange={handleSelectChange} {...rest} >
      <MenuItem key="none" value="">None</MenuItem>
      {
        tasks.filter(task => !task.info.origin && task.permission.super_role === SUPER_ROLE.OWNER).map(task => (<MenuItem key={task.info.tid} value={task.info.tid}>{task.info.name}</MenuItem>))
      }
    </Select >
  );
};

export default TaskSelect;
