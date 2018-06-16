import React from 'react';
import Validator from 'validatorjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { FormDialog } from '../components/Dialogs';

// ui containers
import TaskInfoContainer from './TaskInfoContainer';

// constants & utils
import { mapTaskInfoRequestData } from '../utils/functions';
import * as apiTypes from '../constants/apiTypes';
import { TASK_INFO_RULE } from '../constants';

// services
import APIService from '../services/APIService';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

class TaskClonerDialogContainer extends React.Component {
  handleTaskClone = () => {
    // return a promise
    const { taskInfo, taskId } = this.props.taskManager;
    const { toggleTaskClonePending, updateMessage } = this.props.actions;
    const payload = {
      tid: taskId,
      task_info: mapTaskInfoRequestData(taskInfo),
    };
    const validation = new Validator(mapTaskInfoRequestData(taskInfo), TASK_INFO_RULE);
    if (validation.passes()) {
      toggleTaskClonePending();
      const url = `/taskservice/task/clone/${taskId}/`;
      return APIService.sendRequest(url, apiTypes.CLONE_TASK, payload, 'POST')
        .then((success) => {
          if (success) {
            APIService.sendRequest('/taskservice/task/?format=json', apiTypes.GET_TASKS);
            toggleTaskClonePending();
            updateMessage('Task cloned successfully.');
            return true;
          }
          updateMessage('Clone task failed.');
          toggleTaskClonePending();
          return false;
        })
        .catch(() => {
          updateMessage('Clone task failed.');
          toggleTaskClonePending();
        });
    }
    return new Promise((resolve) => {
      updateMessage('Invalid form data. Please check it again.');
      resolve();
    })
      .then(() => false);
  }

  render() {
    const { taskClonerOpen } = this.props.dialogManager;
    const { clonePending } = this.props.taskManager;
    const { toggleTaskCloner } = this.props.actions;
    return (
      <FormDialog
        title={<FormattedMessage id="taskClonerTitle" />}
        hints={<FormattedMessage id="taskClonerHint" />}
        openState={taskClonerOpen}
        toggle={toggleTaskCloner}
        component={<TaskInfoContainer />}
        onSave={this.handleTaskClone}
        loading={clonePending}
      />
    );
  }
}

const mapStateToProps = ({ dialogManager, taskManager, snackbarManager }) => ({
  dialogManager,
  taskManager,
  snackbarManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...snackbarActions, ...taskActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskClonerDialogContainer);
