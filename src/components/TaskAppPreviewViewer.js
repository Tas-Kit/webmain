import React from 'react';
import { STATUS_MAP_TWO, TIME_UNITS_MAP_TWO } from '../constants';

const TaskAppPreviewViewer = (props) => {
  const { task } = props;
  if (!task) return (<p>Task is unavailable</p>);
  return (
    <div>
      <p>Name: {task.name}</p>
      <p>Status: {STATUS_MAP_TWO[task.status]}</p>
      <p>Roles: {task.roles.join(' ')}</p>
      <p>Expected Efforts: {`${task.expected_effort_num} ${TIME_UNITS_MAP_TWO[task.expected_effor_unit]}`}</p>
    </div>
  );
};

export default TaskAppPreviewViewer;

