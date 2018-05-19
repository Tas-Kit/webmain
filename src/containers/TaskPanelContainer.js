import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TaskPanel from '../components/TaskPanel';

const TaskPanelContainer = (props) => {
  const { tasks } = props.taskManager;
  const { username } = props.currentUserManager;
  return <TaskPanel username={username} tasks={tasks} />;
};

const mapStateToProps = ({ taskManager, currentUserManager }) => ({ taskManager, currentUserManager });

export default withRouter(connect(mapStateToProps)(TaskPanelContainer));
