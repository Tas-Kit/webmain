import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Switch } from '../components/Switch';

// actions
import * as currentUserActions from '../actions/currentUserActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as graphActions from '../actions/graphActions';

// services
import gs from '../services/GraphService';
import APIService from '../services/APIService';

// utils
import { mapNodeToRequestData } from '../utils/functions';

// constants
import * as apiTypes from '../constants/apiTypes';
import { TASK_GRAPH_URL } from '../constants/apiUrls';

const EditSwitchContainer = (props) => {
  const { editMode } = props.currentUserManager;
  const { tasksMap, taskId } = props.taskManager;
  const { addEdgeSelected, deleteSelected } = props.graphManager;
  const {
    toggleEditMode, updateMessage,
    setGraphDataOrigin, updateGraphDataJson,
    toggleAddEdgeButton, toggleDeleteButton,
  } = props.actions;
  let isEditor = false;
  if (Object.prototype.hasOwnProperty.call(tasksMap, taskId)) {
    const superRole = tasksMap[taskId].has_task.super_role;
    isEditor = superRole === 5 || superRole === 10;
  }

  const resetMode = () => {
    if (addEdgeSelected) {
      toggleAddEdgeButton();
      gs.exitEditMode();
    }
    if (deleteSelected) {
      toggleDeleteButton();
    }
  };

  const handleEditModeChange = () => {
    if (editMode) {
      resetMode();
      const url = `${TASK_GRAPH_URL}${taskId}/`;
      const payload = {
        tid: taskId,
        nodes: gs.activeData.nodes.get().map(mapNodeToRequestData),
        edges: gs.activeData.edges.get(),
      };
      APIService.sendRequest(url, apiTypes.SAVE_GRAPH, payload, 'PATCH')
        .then((success) => {
          if (success) {
            updateMessage('Graph saved successfully.');
            // save original graph data for checking unsaved changes
            const graphDataOrigin = gs.activeData;
            setGraphDataOrigin(JSON.parse(JSON.stringify(graphDataOrigin)));
            updateGraphDataJson(JSON.parse(JSON.stringify(graphDataOrigin)));
          }
        })
        .catch(() => {
          updateMessage('Save graph failed.');
        });
    }
    toggleEditMode();
  };

  if (isEditor) {
    return (
      <Switch
        label={<FormattedMessage id="editorLabel" />}
        checked={editMode}
        onChange={handleEditModeChange}
      />
    );
  }
  return <div />;
};

const mapStateToProps = store => ({
  currentUserManager: store.currentUserManager,
  taskManager: store.taskManager,
  graphManager: store.graphManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...currentUserActions, ...snackbarActions, ...graphActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSwitchContainer);
