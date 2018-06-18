import React from 'react';
import Validator from 'validatorjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { FormDialog } from '../components/Dialogs';

// ui conFormattedMessage
import TaskInfoContainer from './TaskInfoContainer';

// constants
import * as apiTypes from '../constants/apiTypes';
import { TASK_INFO_RULE } from '../constants';
import { mapTaskInfoRequestData } from '../utils/functions';
import { TASK_SERVICE_URL, TASK_GET_URL } from '../constants/apiUrls';

// services
import APIService from '../services/APIService';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

class TaskCreatorDialogContainer extends React.Component {
  handleTaskInfoSave = () => {
    // return a promise
    const { taskInfo } = this.props.taskManager;
    const { toggleTaskActionPending, updateMessage } = this.props.actions;
    const payload = mapTaskInfoRequestData(taskInfo);
    const validation = new Validator(payload, TASK_INFO_RULE);
    if (validation.passes()) {
      toggleTaskActionPending();
      const url = TASK_SERVICE_URL;
      return APIService.sendRequest(url, apiTypes.SAVE_TASK, payload, 'POST')
        .then((success) => {
          if (success) {
            APIService.sendRequest(TASK_GET_URL, apiTypes.GET_TASKS);
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
          return false;
        });
    }
    return new Promise((resolve) => {
      updateMessage('Invalid form data. Please check it again.');
      resolve();
    })
      .then(() => false);
  };

  render() {
    const { taskCreatorOpen } = this.props.dialogManager;
    const { pending } = this.props.taskManager;
    const { toggleTaskCreator } = this.props.actions;
    return (
      <FormDialog
        title={<FormattedMessage id="taskCreatorTitle" />}
        hints={<FormattedMessage id="taskCreatorHint" />}
        openState={taskCreatorOpen}
        toggle={toggleTaskCreator}
        component={<TaskInfoContainer />}
        onSave={this.handleTaskInfoSave}
        loading={pending}
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreatorDialogContainer);
