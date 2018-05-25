import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

// ui components
import { PureDisplayDialog, AlertDialog } from '../components/Dialogs';

// ui containers
import InvitationContainer from './InvitationContainer';
import StepCreatorDialogContainer from './StepCreatorDialogContainer';
import TaskCreatorDialogContainer from './TaskCreatorDialogContainer';
import TaskEditorDialogContainer from './TaskEditorDialogContainer';

// services
import APIService from '../services/APIService';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

// constants
import { PINK } from '../constants/colors';
import * as apiTypes from '../constants/apiTypes';

// utils
import { backToMain } from '../utils/functions';
import { rejectInvitation } from '../utils/api';

const DialogsContainer = (props) => {
  const { deleteTaskOpen, invitationOpen, quitTaskOpen } = props.dialogManager;
  const { deletePending } = props.taskManager;
  const {
    toggleDeleteTask,
    updateMessage,
    toggleTaskDeletePending,
    toggleInvitation,
    toggleQuitTask,
  } = props.actions;

  const handleTaskDelete = () => {
    // return a promise
    toggleTaskDeletePending();
    const { taskId } = props.taskManager;
    const url = `/task/${taskId}/`;
    return APIService.sendRequest(url, apiTypes.DELETE_TASK, {}, 'DELETE')
      .then((success) => {
        if (success) {
          APIService.sendRequest('/task/?format=json', apiTypes.GET_TASKS);
toggleTaskDeletePending();
          updateMessage('Task deleted successfully.');
          backToMain();
        }
      })
      .catch(() => {
        updateMessage('Delete task failed.');
        toggleTaskDeletePending();
      });
  };

  const handleTaskQuit = () => {
    toggleTaskActionPending();
    const { taskId } = props.taskManager;
    rejectInvitation(taskId)
      .then((success) => {
        if (success) {
          // APIService.sendRequest('/task/?format=json', apiTypes.GET_TASKS);
          toggleTaskActionPending();
          updateMessage('Task quit successfully.');
          backToMain();
        }
      })
      .catch(() => {
        updateMessage('Quit task failed.');
        toggleTaskActionPending();
      });
  };

  return (
    <div>
      {/* Task Creator */}
      <TaskCreatorDialogContainer />

      {/* Task Editor */}
      <TaskEditorDialogContainer />

      {/* Step Creator */}
      <StepCreatorDialogContainer />

      {/* Invitation Dialog */}
      <PureDisplayDialog
        title="Invitation"
        open={invitationOpen}
        toggle={toggleInvitation}
      >
        <InvitationContainer />
      </PureDisplayDialog>

      {/* Delete Task Alert Dialog */}
      <AlertDialog
        title="Delete Task"
        message={
          <span>Are you sure you want to
            <span style={{ color: PINK }}> permanently </span>
            remove this task?
          </span>
        }
        openState={deleteTaskOpen}
        toggle={toggleDeleteTask}
        onConfirm={handleTaskDelete}
        loading={deletePending}
      />

      {/* Quit Task Alert Dialog */}
      <AlertDialog
        title="Quit Task"
        message={
          <span>Are you sure you want to
            <span style={{ color: PINK }}> permanently </span>
            quit from this task?
          </span>
        }
        openState={quitTaskOpen}
        toggle={toggleQuitTask}
        onConfirm={handleTaskQuit}
        loading={pending}
      />
    </div>
  );
};

const mapStateToProps = ({ dialogManager, taskManager, snackbarManager }) => ({
  dialogManager,
  taskManager,
  snackbarManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...snackbarActions, ...taskActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DialogsContainer));
