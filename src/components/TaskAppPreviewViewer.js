import React from 'react';

const TaskAppPreviewViewer = (props) => {
  const { task } = props;
  if (!task) return (<p>Task is unavailable</p>);
  return (
    <div>
      <p>Name: {task.name}</p>
      <p>Status: {task.status}</p>
      <p>Roles: {task.roles.join(' ')}</p>
      <p>Expected Efforts: {`${task.expected_effort_num} ${task.expected_effor_unit}`}</p>
    </div>
  );
};

export default TaskAppPreviewViewer;

