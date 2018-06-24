import React from 'react';
import { withRouter } from 'react-router';
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
import { TASK_CLONE_URL, TASK_GET_URL } from '../constants/apiUrls';

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
      const url = `${TASK_CLONE_URL}${taskId}/`;
      return APIService.sendRequest(url, apiTypes.CLONE_TASK, payload, 'POST')
        .then((success) => {
          if (success) {
            const { createdTid } = this.props.taskManager;
            const { history } = this.props;
            history.push(`${createdTid}`);
            APIService.sendRequest(TASK_GET_URL, apiTypes.GET_TASKS);
            toggleTaskClonePending();
            updateMessage(<FormattedMessage id="taskCloneMsg" />);
            return true;
          }
          updateMessage(<FormattedMessage id="taskCloneFailMsg" />);
          toggleTaskClonePending();
          return false;
        })
        .catch(() => {
          updateMessage(<FormattedMessage id="taskCloneFailMsg" />);
          toggleTaskClonePending();
        });
    }
    return new Promise((resolve) => {
      updateMessage(<FormattedMessage id="invalidFormDataMsg" />);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskClonerDialogContainer));
