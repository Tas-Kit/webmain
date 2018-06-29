import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import TaskPanel from '../components/TaskPanel';

import * as taskActions from '../actions/taskActions';
import * as currentUserActions from '../actions/currentUserActions';

const TaskPanelContainer = (props) => {
  const { tasks, filter } = props.taskManager;
  const { username } = props.currentUserManager;
  const { setActiveTaskId, resetEditMode, setFilter } = props.actions;
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <TaskPanel
      username={username}
      tasks={tasks}
      onTaskClick={setActiveTaskId}
      resetEditMode={resetEditMode}
      filter={filter}
      handleFilterChange={handleFilterChange}
    />
  );
};

const mapStateToProps = ({ taskManager, currentUserManager }) => ({ taskManager, currentUserManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions, ...currentUserActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskPanelContainer));
