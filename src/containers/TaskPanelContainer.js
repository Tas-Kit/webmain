import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import TaskPanel from '../components/TaskPanel';

import * as taskActions from '../actions/taskActions';

const TaskPanelContainer = (props) => {
  const { tasks } = props.taskManager;
  const { username } = props.currentUserManager;
  const { setActiveTaskId } = props.actions;
  return <TaskPanel username={username} tasks={tasks} onTaskClick={setActiveTaskId} />;
};

const mapStateToProps = ({ taskManager, currentUserManager }) => ({ taskManager, currentUserManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskPanelContainer));
