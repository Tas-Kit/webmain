import React from 'react';
import Validator from 'validatorjs';
import { withRouter } from 'react-router';
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
    const { toggleTaskCreatePending, updateMessage } = this.props.actions;
    const payload = mapTaskInfoRequestData(taskInfo);
    const validation = new Validator(payload, TASK_INFO_RULE);
    if (validation.passes()) {
      toggleTaskCreatePending();
      const url = TASK_SERVICE_URL;
      return APIService.sendRequest(url, apiTypes.SAVE_TASK, payload, 'POST')
        .then((success) => {
          if (success) {
            const { createdTid } = this.props.taskManager;
            const { history } = this.props;
            history.push(`task/${createdTid}`);
            APIService.sendRequest(TASK_GET_URL, apiTypes.GET_TASKS);
            toggleTaskCreatePending();
            updateMessage(<FormattedMessage id="taskCreateMsg" />);
            return true;
          }
          updateMessage(<FormattedMessage id="taskCreateFailMsg" />);
          toggleTaskCreatePending();
          return false;
        })
        .catch(() => {
          updateMessage(<FormattedMessage id="taskCreateFailMsg" />);
          toggleTaskCreatePending();
          return false;
        });
    }
    return new Promise((resolve) => {
      updateMessage(<FormattedMessage id="invalidFormDataMsg" />);
      resolve();
    })
      .then(() => false);
  };

  render() {
    const { taskCreatorOpen } = this.props.dialogManager;
    const { createPending } = this.props.taskManager;
    const { toggleTaskCreator } = this.props.actions;
    return (
      <FormDialog
        title={<FormattedMessage id="taskCreatorTitle" />}
        hints={<FormattedMessage id="taskCreatorHint" />}
        openState={taskCreatorOpen}
        toggle={toggleTaskCreator}
        component={<TaskInfoContainer />}
        onSave={this.handleTaskInfoSave}
        loading={createPending}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskCreatorDialogContainer));
