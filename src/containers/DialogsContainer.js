import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { FormattedMessage } from 'react-intl';
// ui components
import { PureDisplayDialog, AlertDialog } from '../components/Dialogs';

// ui containers
import InvitationContainer from './InvitationContainer';
import TaskCreatorDialogContainer from './TaskCreatorDialogContainer';
import TaskEditorDialogContainer from './TaskEditorDialogContainer';
import TaskViewerDialogContainer from './TaskViewerDialogContainer';
import StepCreatorDialogContainer from './StepCreatorDialogContainer';
import StepEditorDialogContainer from './StepEditorDialogContainer';
import StepViewerDialogContainer from './StepViewerDialogContainer';

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
  const { deletePending, quitPending } = props.taskManager;
  const {
    toggleDeleteTask,
    updateMessage,
    toggleTaskDeletePending,
    toggleTaskQuitPending,
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
    const { taskId } = props.taskManager;
    toggleTaskQuitPending();
    return rejectInvitation(taskId)
      .then((success) => {
        if (success) {
          APIService.sendRequest('/task/?format=json', apiTypes.GET_TASKS);
          toggleTaskQuitPending();
          updateMessage('Task quit successfully.');
          backToMain();
        }
      })
      .catch(() => {
        toggleTaskQuitPending();
        updateMessage('Quit task failed.');
      });
  };

  return (
    <div>
      {/* Task Creator */}
      <TaskCreatorDialogContainer />

      {/* Task Editor */}
      <TaskEditorDialogContainer />

      {/* Task Viewer */}
      <TaskViewerDialogContainer />

      {/* Step Creator */}
      <StepCreatorDialogContainer />

      {/* Step Editor */}
      <StepEditorDialogContainer />

      {/* Step Viewer */}
      <StepViewerDialogContainer />

      {/* Invitation Dialog */}
      <PureDisplayDialog
        title={<FormattedMessage id="inviteHeading" defaultMessage="Invitation" />}
        open={invitationOpen}
        toggle={toggleInvitation}
      >
        <InvitationContainer />
      </PureDisplayDialog>

      {/* Delete Task Alert Dialog */}
      <AlertDialog
        title={<FormattedMessage id="deleteHeading" defaultMessage="Delete Task" />}
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
        title={<FormattedMessage id="quitHeading" defaultMessage="Quit Task" />}
        message={
          <span>Are you sure you want to
            <span style={{ color: PINK }}> permanently </span>
            quit from this task?
          </span>
        }
        openState={quitTaskOpen}
        toggle={toggleQuitTask}
        onConfirm={handleTaskQuit}
        loading={quitPending}
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
