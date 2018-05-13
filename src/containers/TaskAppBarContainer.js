import React from 'react';
import { connect } from 'react-redux';

import TaskAppBar from '../components/TaskAppBar';

const TaskAppBarContainer = (props) => {
  const getTaskTitle = (id) => {
    const { tasks } = props.taskManager;
    const taskNameMap = {};
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      taskNameMap[task.info.tid] = task.info.name;
    }
    return taskNameMap[id];
  };

  const { taskId } = props.taskManager;
  return <TaskAppBar title={getTaskTitle(taskId)} />;
};

const mapStateToProps = ({ taskManager }) => ({ taskManager });

export default connect(mapStateToProps)(TaskAppBarContainer);
