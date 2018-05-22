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
  const { toggleTaskEditor, toggleDeleteTask, toggleInvitation } = props.actions;
  const { users } = props;
  const handleGraphSave = () => {
    const { taskId } = props.taskManager;
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
      users={users}
      toggleTaskEditor={toggleTaskEditor}
      toggleDeleteTask={toggleDeleteTask}
      toggleInvitation={toggleInvitation}
      onGraphSave={handleGraphSave}
    />
  );
};

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...taskActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskToolbarContainer));
