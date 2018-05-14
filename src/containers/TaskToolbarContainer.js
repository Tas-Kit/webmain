import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TaskToolbar from '../components/TaskToolbar';

import * as dialogActions from '../actions/dialogActions';

const TaskToolbarContainer = (props) => {
  const { toggleTaskInfo, toggleDeleteTask } = props.actions;
  const { users } = props;
  return (
    <TaskToolbar
      users={users}
      toggleTaskInfo={toggleTaskInfo}
      toggleDeleteTask={toggleDeleteTask}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dialogActions, dispatch),
});

export default connect(null, mapDispatchToProps)(TaskToolbarContainer);
