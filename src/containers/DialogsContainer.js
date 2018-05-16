import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ui components
import { FormDialog, AlertDialog } from '../components/Dialogs';

// ui containers
import TaskInfoContainer from './TaskInfoContainer';
import StepInfoContainer from './StepInfoContainer';

import APIService from '../services/APIService';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

// constants
import { PINK } from '../constants/colors';
import { STATUS_MAP, TIME_UNITS_MAP } from '../constants';

const DialogsContainer = (props) => {
  const { taskInfoOpen, stepInfoOpen, deleteTaskOpen } = props.dialogManager;
  const { pending } = props.taskManager;
  const {
    toggleTaskInfo,
    toggleStepInfo,
    toggleDeleteTask,
    updateMessage,
    toggleTaskActionPending,
  } = props.actions;

  const handleTaskInfoSave = () => {
    // return a promise
    const { taskInfo } = props.taskManager;
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
    console.log(payload);
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
