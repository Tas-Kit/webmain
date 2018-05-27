import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

// ui component
import TaskToolbar from '../components/TaskToolbar';

// redux action
import * as dialogActions from '../actions/dialogActions';
import * as taskActions from '../actions/taskActions';
import * as snackbarActions from '../actions/snackbarActions';

// service
import gs from '../services/GraphService';
import APIService from '../services/APIService';

// util & constants
import { mapNodeToRequestData } from '../utils/functions';
import * as apiTypes from '../constants/apiTypes';
import { ACCEPTANCE } from '../constants';

const TaskToolbarContainer = (props) => {
  const {
    toggleTaskEditor, toggleDeleteTask, toggleInvitation, toggleQuitTask, toggleTaskSavePending,
    updateMessage,
  } = props.actions;
  const {
    taskUsers, tasks, taskId, savePending,
  } = props.taskManager;
  const acceptedUsers = taskUsers
    .filter(taskUser => taskUser.has_task.acceptance === ACCEPTANCE.ACCEPT);
  const activeTask = tasks.find(task => task.info.tid === taskId);
  const userPermission = activeTask ? activeTask.permission : {};
  const handleGraphSave = () => {
    const url = `/task/graph/${taskId}/`;
    const payload = {
      tid: taskId,
      nodes: gs.activeData.nodes.get().map(mapNodeToRequestData),
      edges: gs.activeData.edges.get(),
    };
    console.log(payload);
    toggleTaskSavePending();
    APIService.sendRequest(url, apiTypes.SAVE_GRAPH, payload, 'PATCH')
      .then((success) => {
        if (success) {
          toggleTaskSavePending();
          updateMessage('Graph saved successfully.');
        }
      })
      .catch(() => {
        toggleTaskSavePending();
        updateMessage('Save graph failed.');
      });
  };
  return (
    <TaskToolbar
      users={acceptedUsers}
      userSuperRole={userPermission.super_role}
      toggleTaskEditor={toggleTaskEditor}
      toggleDeleteTask={toggleDeleteTask}
      toggleInvitation={toggleInvitation}
      toggleQuitTask={toggleQuitTask}
      onGraphSave={handleGraphSave}
      savePending={savePending}
    />
  );
};

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...taskActions, ...snackbarActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskToolbarContainer));
