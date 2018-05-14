import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ui components
import { FormDialog, PureDisplayDialog } from '../components/Dialogs';

// ui containers
import TaskInfoContainer from './TaskInfoContainer';
import StepInfoContainer from './StepInfoContainer';
import InvitationContainer from "./InvitationContainer";

import APIService from '../services/APIService';

// redux actions
import * as dialogActions from '../actions/dialogActions';

import { STATUS_MAP, TIME_UNITS_MAP } from '../constants';

const DialogsContainer = props => {
  const { taskInfoOpen, stepInfoOpen, invitationOpen } = props.dialogManager;
  const { toggleTaskInfo, toggleStepInfo, toggleInvitation } = props.actions;

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
    // const data = new FormData();
    // data.append('json', JSON.stringify(payload));
    console.log(JSON.stringify(payload));
    const url = '/task/';
    APIService.sendRequest(url, 'save_task', JSON.stringify(payload), 'POST');
  };

  return (
    <div>
      {/* Task Info Form */}
      <FormDialog
        title="Task Info"
        hints="To create a task, please fill in the fields below."
        open={taskInfoOpen}
        toggle={toggleTaskInfo}
        component={<TaskInfoContainer />}
        onSave={handleTaskInfoSave}
      />

      {/* Step Info Form */}
      <FormDialog
        title="Step Info"
        hints="To create a step, please fill in the fields below."
        open={stepInfoOpen}
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
    </div>
  );
};

const mapStateToProps = ({ dialogManager, taskManager }) => ({ dialogManager, taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
