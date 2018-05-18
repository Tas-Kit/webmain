import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TaskToolbar from '../components/TaskToolbar';

import * as dialogActions from '../actions/dialogActions';

const styles = {
  instructions: {
    fontWeight: 300,
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
  },
};

const TaskToolbarContainer = (props) => {
  const { taskId } = props.taskManager;
  const { toggleTaskInfo, toggleDeleteTask, toggleInvitation } = props.actions;
  const { users } = props;
  return (
    taskId ?
      <TaskToolbar
        users={users}
        toggleTaskInfo={toggleTaskInfo}
        toggleDeleteTask={toggleDeleteTask}
        toggleInvitation={toggleInvitation}
      />
      :
      <div style={styles.instructions}>Please select a task.</div>
  );
};

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dialogActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskToolbarContainer);
