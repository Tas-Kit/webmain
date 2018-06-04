import React from 'react';
import { connect } from 'react-redux';
import TaskInfoView from '../components/TaskInfoView';

const TaskInfoViewerContainer = (props) => {
  const { taskInfo } = props.taskManager;
  return (
    <TaskInfoView info={taskInfo} />
  );
};

const mapStateToProps = store => ({
  taskManager: store.taskManager,
});

export default connect(mapStateToProps)(TaskInfoViewerContainer);
