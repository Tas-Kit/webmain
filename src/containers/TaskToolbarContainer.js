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
  const { toggleTaskEditor, toggleDeleteTask, toggleInvitation } = props.actions;
  const { users } = props;
  return (
    <TaskToolbar
      users={users}
      toggleTaskEditor={toggleTaskEditor}
      toggleDeleteTask={toggleDeleteTask}
      toggleInvitation={toggleInvitation}
    />
  );
};

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...taskActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskToolbarContainer));
