import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

// ui component
import TaskToolbar from '../components/TaskToolbar';

// redux action
import * as dialogActions from '../actions/dialogActions';
import * as taskActions from '../actions/taskActions';

const TaskToolbarContainer = (props) => {
  const {
    toggleTaskEditor, toggleDeleteTask, toggleInvitation, toggleQuitTask,
  } = props.actions;
  const { taskUsers, tasks, taskId } = props.taskManager;
  const activeTask = tasks.find(task => task.info.tid === taskId);
  const userPermission = activeTask ? activeTask.permission : {};
  return (
    <TaskToolbar
      users={taskUsers}
      userSuperRole={userPermission.super_role}
      toggleTaskEditor={toggleTaskEditor}
      toggleDeleteTask={toggleDeleteTask}
      toggleInvitation={toggleInvitation}
      toggleQuitTask={toggleQuitTask}
    />
  );
};

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...taskActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskToolbarContainer));
