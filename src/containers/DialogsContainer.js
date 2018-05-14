import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ui components

import { FormDialog, PureDisplayDialog,  AlertDialog } from '../components/Dialogs';

// ui containers
import TaskInfoContainer from './TaskInfoContainer';
import StepInfoContainer from './StepInfoContainer';
import InvitationContainer from "./InvitationContainer";

import APIService from '../services/APIService';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

// constants
import { SECONDARY } from '../constants/colors';
import { STATUS_MAP, TIME_UNITS_MAP } from '../constants';

const DialogsContainer = (props) => {
  const { taskInfoOpen, stepInfoOpen, deleteTaskOpen, invitationOpen  } = props.dialogManager;
  const { pending } = props.taskManager;
  const {
    toggleTaskInfo,
    toggleStepInfo,
    toggleDeleteTask,
    updateMessage,
    toggleTaskActionPending,
    toggleInvitation 
  } = props.actions;

  const handleTaskInfoSave = () => {
    // return a promise
    const { taskInfo } = props.taskManager;
    const payload = {
      name: taskInfo.name,
      status: STATUS_MAP[taskInfo.status],
      roles: taskInfo.roles,
      description: taskInfo.description,
      deadline: (new Date(taskInfo.deadline)).toISOString(),
      expected_effort_num: taskInfo.effortTime,
      expected_effort_unit: TIME_UNITS_MAP[taskInfo.effortUnit],
    };
    toggleTaskActionPending();
    const url = '/task/';
    return APIService.sendRequest(url, 'save_task', payload, 'POST')
      .then((success) => {
        if (success) {
          APIService.sendRequest('/task/?format=json', 'get_tasks');
          toggleTaskActionPending();
          updateMessage('Task created successfully.');
        }
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
    return APIService.sendRequest(url, 'delete_task', {}, 'DELETE')
      .then((success) => {
        if (success) {
          APIService.sendRequest('/task/?format=json', 'get_tasks');
          toggleTaskActionPending();
          updateMessage('Task deleted successfully.');
        }
      })
      .catch(() => {
        updateMessage('Delete task failed.');
        toggleTaskActionPending();
      });
  };

  return (
    <div>
      {/* Task Info Form */}
      <FormDialog
        title="Task Info"
        hints="To create a task, please fill in the fields below."
        openState={taskInfoOpen}
        toggle={toggleTaskInfo}
        component={<TaskInfoContainer />}
        onSave={handleTaskInfoSave}
        loading={pending}
      />

      {/* Step Info Form */}
      <FormDialog
        title="Step Info"
        hints="To create a step, please fill in the fields below."
        openState={stepInfoOpen}
        toggle={toggleStepInfo}
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
            <span style={{ color: SECONDARY }}> permanently </span>
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
