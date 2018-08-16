import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import TaskPanel from '../components/TaskPanel';

import * as taskActions from '../actions/taskActions';
import * as currentUserActions from '../actions/currentUserActions';
import * as taskAppActions from '../actions/taskAppActions';

const TaskPanelContainer = (props) => {
  const { tasks, filter } = props.taskManager;
  const { username } = props.currentUserManager;
  const { latestDownloadTid } = props.taskAppManager;
  const {
    setActiveTaskId, resetEditMode, setFilter, resetLatestDownloadTid,
  } = props.actions;
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
      needHighlightTid={latestDownloadTid}
      resetNeedHighlightTid={resetLatestDownloadTid}
    />
  );
};

const mapStateToProps = ({ taskManager, currentUserManager, taskAppManager }) => ({ taskManager, currentUserManager, taskAppManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions, ...currentUserActions, ...taskAppActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskPanelContainer));
