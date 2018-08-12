import React from 'react';
import { Select, MenuItem } from '../../node_modules/@material-ui/core';

const TaskSelect = (props) => {
  const { tasks, currentTaskId, handleSelectChange } = props;
  return (
    <Select value={currentTaskId || ''} onChange={handleSelectChange} >
      <MenuItem key="none" value="">None</MenuItem>
      {
        tasks.map(task => (<MenuItem key={task.info.tid} value={task.info.tid}>{task.info.name}</MenuItem>))
      }
    </Select >
  );
};

export default TaskSelect;
