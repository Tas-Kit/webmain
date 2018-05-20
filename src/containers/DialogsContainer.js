import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ui components
import { FormDialog, PureDisplayDialog, AlertDialog } from '../components/Dialogs';

// ui containers
import StepInfoContainer from './StepInfoContainer';
import InvitationContainer from './InvitationContainer';
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

const DialogsContainer = (props) => {
  const {
    stepInfoOpen, deleteTaskOpen, invitationOpen, quitTaskOpen,
  } = props.dialogManager;
  const { pending } = props.taskManager;
  const {
    toggleStepInfo,
    toggleDeleteTask,
    updateMessage,
    toggleTaskActionPending,
    toggleInvitation,
    toggleQuitTask,
  } = props.actions;

  const handleTaskDelete = () => {
    // return a promise
    toggleTaskActionPending();
    const { taskId } = props.taskManager;
    const url = `/task/${taskId}/`;
    return APIService.sendRequest(url, apiTypes.DELETE_TASK, {}, 'DELETE')
      .then((success) => {
        if (success) {
          APIService.sendRequest('/task/?format=json', apiTypes.GET_TASKS);
          toggleTaskActionPending();
          updateMessage('Task deleted successfully.');
        }
      })
      .catch(() => {
        updateMessage('Delete task failed.');
        toggleTaskActionPending();
      });
  };

  const handleTaskQuit = () => (
    new Promise((resolve) => { resolve(); }).then(() => true)
  );

  const handleStepInfoSave = () => (
    new Promise((resolve) => { resolve(); }).then(() => true)
  );

  return (
    <div>
      {/* Task Creator */}
      <TaskCreatorDialogContainer />

      {/* Task Editor */}
      <TaskEditorDialogContainer />

      {/* Step Info Form */}
      <FormDialog
        title="Step Info"
        hints="To create a step, please fill in the fields below."
        openState={stepInfoOpen}
        toggle={toggleStepInfo}
        onSave={handleStepInfoSave}
        component={<StepInfoContainer />}
      />

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
        loading={pending}
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

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
