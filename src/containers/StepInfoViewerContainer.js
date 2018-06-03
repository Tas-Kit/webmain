import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StepInfoView from '../components/StepInfoView';
import APIService from '../services/APIService';
import * as apiTypes from '../constants/apiTypes';
import * as snackbarActions from '../actions/snackbarActions';
import * as stepActions from '../actions/stepActions';
import * as dialogActions from '../actions/dialogActions';

const StepInfoViewerContainer = (props) => {
  const { stepInfo, triggerPending } = props.stepManager;
  const { taskUsers } = props.taskManager;

  const getUserIndex = (name) => {
    const users = taskUsers.map(user => user.basic.username);
    return users.indexOf(name);
  };

  // user's role in this task
  const { username } = props.currentUserManager;
  const userIndex = getUserIndex(username);
  let userTaskRole = null;
  if (userIndex >= 0) {
    userTaskRole = taskUsers[userIndex].has_task.role;
  }

  const handleTrigger = () => {
    const { updateMessage, toggleTriggerPending, toggleStepViewer } = props.actions;
    const { taskId: tid } = props.taskManager;
    const { stepId: sid } = props.stepManager;
    const url = `/task/trigger/${tid}/`;
    if (sid === null) {
      updateMessage('Trigger can\'t be performed before the graph is saved.');
    } else {
      toggleTriggerPending();
      const payload = { tid, sid };
      APIService.sendRequest(url, apiTypes.TRIGGER, payload, 'POST')
        .then((triggered) => {
          if (triggered) {
            toggleTriggerPending();
            updateMessage('Task triggered successfully.');
            toggleStepViewer();
          }
        })
        .catch(() => {
          toggleTriggerPending();
          updateMessage('Trigger task failed.');
        });
    }
  };

  return (
    <StepInfoView
      info={stepInfo}
      userTaskRole={userTaskRole}
      onTrigger={handleTrigger}
      triggerPending={triggerPending}
    />
  );
};

const mapStateToProps = store => ({
  taskManager: store.taskManager,
  stepManager: store.stepManager,
  dialogManager: store.dialogManager,
  currentUserManager: store.currentUserManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...snackbarActions, ...stepActions, ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepInfoViewerContainer);
