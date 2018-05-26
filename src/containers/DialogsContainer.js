import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

// ui components
import { PureDisplayDialog, AlertDialog } from '../components/Dialogs';

// ui containers
import InvitationContainer from './InvitationContainer';
import TaskCreatorDialogContainer from './TaskCreatorDialogContainer';
import TaskEditorDialogContainer from './TaskEditorDialogContainer';
import StepCreatorDialogContainer from './StepCreatorDialogContainer';
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

const DialogsContainer = (props) => {
  const { deleteTaskOpen, invitationOpen } = props.dialogManager;
  const { deletePending } = props.taskManager;
  const {
    toggleDeleteTask,
    updateMessage,
    toggleTaskDeletePending,
    toggleInvitation,
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
          props.history.push('/');
        }
      })
      .catch(() => {
        updateMessage('Delete task failed.');
        toggleTaskDeletePending();
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

      {/* Step Viewer */}
      <StepViewerDialogContainer />

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
