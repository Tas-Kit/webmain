import React from 'react';
import Validator from 'validatorjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

class TaskEditorDialogContainer extends React.Component {
  handleTaskModify = () => {
    // return a promise
    const { taskInfo, taskId } = this.props.taskManager;
    const { toggleTaskActionPending, updateMessage } = this.props.actions;
    const payload = mapTaskInfoRequestData(taskInfo);
    const validation = new Validator(payload, TASK_INFO_RULE);
    if (validation.passes()) {
      toggleTaskActionPending();
      const url = `/task/${taskId}/`;
      return APIService.sendRequest(url, apiTypes.MODIFY_TASK, payload, 'PATCH')
        .then((success) => {
          if (success) {
            APIService.sendRequest('/task/?format=json', apiTypes.GET_TASKS);
            toggleTaskActionPending();
            updateMessage('Task modified successfully.');
            return true;
          }
          updateMessage('Modify task failed.');
          toggleTaskActionPending();
          return false;
        })
        .catch(() => {
          updateMessage('Modify task failed.');
          toggleTaskActionPending();
        });
    }
    return new Promise((resolve) => {
      updateMessage('Invalid form data. Please check it again.');
      resolve();
    })
      .then(() => false);
  }

  render() {
    const { taskEditorOpen } = this.props.dialogManager;
    const { pending } = this.props.taskManager;
    const { toggleTaskEditor } = this.props.actions;
    return (
      <FormDialog
        isEditor
        title="Task Editor"
        hints="To edit a task, please fill in the fields below."
        openState={taskEditorOpen}
        toggle={toggleTaskEditor}
        component={<TaskInfoContainer />}
        onSave={this.handleTaskModify}
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditorDialogContainer);
