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

// constants
import { SECONDARY } from '../constants/colors';
import { STATUS_MAP, TIME_UNITS_MAP } from '../constants';

const DialogsContainer = (props) => {
  const { taskInfoOpen, stepInfoOpen, deleteTaskOpen } = props.dialogManager;
  const {
    toggleTaskInfo,
    toggleStepInfo,
    toggleDeleteTask,
    updateMessage
  } = props.actions;

  const handleTaskInfoSave = () => {
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
    const url = '/task/';
    APIService.sendRequest(url, 'save_task', payload, 'POST')
      .then((success) => {
        if (success) {
          APIService.sendRequest('/task/?format=json', 'get_tasks');
          updateMessage('Task created successfully.');
        }
      });
  };

  const handleTaskDelete = () => {
    const { taskId } = props.taskManager;
    const payload = { tid: taskId };
    const url = `/task/${taskId}/`;
    console.log(taskId);
    // APIService.sendRequest(url, 'delete_task', payload, 'PATCH');
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
            <span style={{ color: SECONDARY }}> permanently </span>
            remove this task?
          </span>
        }
        openState={deleteTaskOpen}
        toggle={toggleDeleteTask}
        onConfirm={handleTaskDelete}
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
  actions: bindActionCreators({ ...dialogActions, ...snackbarActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
