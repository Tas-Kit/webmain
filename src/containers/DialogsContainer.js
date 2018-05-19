import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ui components
import { FormDialog, PureDisplayDialog, AlertDialog } from '../components/Dialogs';

// ui containers
import TaskInfoContainer from './TaskInfoContainer';
import StepInfoContainer from './StepInfoContainer';
import InvitationContainer from './InvitationContainer';
import TaskCreatorDialogContainer from './TaskCreatorDialogContainer';

// services
import APIService from '../services/APIService';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

// constants
import { PINK } from '../constants/colors';
import { STATUS_MAP, TIME_UNITS_MAP } from '../constants';
import * as apiTypes from '../constants/apiTypes';

const DialogsContainer = (props) => {
  const {
    taskInfoOpen, stepInfoOpen, deleteTaskOpen, invitationOpen,
  } = props.dialogManager;
  const { pending } = props.taskManager;
  const {
    toggleTaskInfo,
    toggleStepInfo,
    toggleDeleteTask,
    updateMessage,
    toggleTaskActionPending,
    toggleInvitation,
  } = props.actions;

  const handleTaskInfoSave = () => {
    // return a promise
    const { taskInfo } = props.taskManager;
    // filter out empty string and array
    const keys = Object.keys(taskInfo).filter(key => (key !== 'roles' && taskInfo[key] !== '')
      || (key === 'roles' && taskInfo[key].length !== 0));

    const payload = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      switch (key) {
        case 'status':
          payload.status = STATUS_MAP[taskInfo.status];
          break;
        case 'effortUnit':
          payload.expected_effort_unit = TIME_UNITS_MAP[taskInfo.effortUnit];
          break;
        case 'deadline':
          payload.deadline = (new Date(taskInfo.deadline)).toISOString();
          break;
        default:
          payload[key] = taskInfo[key];
      }
    }
    toggleTaskActionPending();
    const url = '/task/';
    return APIService.sendRequest(url, apiTypes.SAVE_TASK, payload, 'POST')
      .then((success) => {
        if (success) {
          APIService.sendRequest('/task/?format=json', apiTypes.GET_TASKS);
          toggleTaskActionPending();
          updateMessage('Task created successfully.');
          return true;
        }
        updateMessage('Create task failed.');
        toggleTaskActionPending();
        return false;
      })
      .catch(() => {
        updateMessage('Create task failed.');
        toggleTaskActionPending();
      });
  };

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

  const handleStepInfoSave = () => (
    new Promise((resolve) => { resolve(); }).then(() => true)
  );

  return (
    <div>
      {/* Task Creator */}
      <TaskCreatorDialogContainer />

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
