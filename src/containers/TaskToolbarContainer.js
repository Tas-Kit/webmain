import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

// ui component
import TaskToolbar from '../components/TaskToolbar';

// redux action
import * as dialogActions from '../actions/dialogActions';
import * as taskActions from '../actions/taskActions';

// service
import gs from '../services/GraphService';
import APIService from '../services/APIService';

// util & constants
import { mapNodeToRequestData } from '../utils/functions';
import * as apiTypes from '../constants/apiTypes';

const TaskToolbarContainer = (props) => {
  const {
    toggleTaskEditor, toggleDeleteTask, toggleInvitation, toggleQuitTask,
  } = props.actions;
  const { taskUsers, tasks, taskId } = props.taskManager;
  const activeTask = tasks.find(task => task.info.tid === taskId);
  const userPermission = activeTask ? activeTask.permission : {};
  const handleGraphSave = () => {
    const url = `/task/graph/${taskId}/`;
    const payload = {
      tid: taskId,
      nodes: gs.activeData.nodes.get().map(mapNodeToRequestData),
      edges: gs.activeData.edges.get(),
    };
    APIService.sendRequest(url, apiTypes.SAVE_GRAPH, payload, 'PATCH')
      .then((success) => {
        console.log('save graph success', success);
      });
    // console.log(gs.activeData.nodes.get());
    // console.log(gs.activeData.edges.get());
  };
  return (
    <TaskToolbar
      users={taskUsers}
      userSuperRole={userPermission.super_role}
      toggleTaskEditor={toggleTaskEditor}
      toggleDeleteTask={toggleDeleteTask}
      toggleInvitation={toggleInvitation}
      toggleQuitTask={toggleQuitTask}
      onGraphSave={handleGraphSave}
    />
  );
};

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...taskActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskToolbarContainer));
