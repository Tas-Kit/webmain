import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskInfo from '../components/TaskInfo';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as taskActions from '../actions/taskActions';

const TaskInfoContainer = (props) => {
  const { taskInfo } = props.taskManager;
  const { updateTaskInfo } = props.actions;
  return (
    <TaskInfo
      info={taskInfo}
      update={updateTaskInfo}
    />
  );
};

const mapStateToProps = ({ taskManager, dialogManager }) => ({
  taskManager,
  dialogManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions, ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoContainer);
