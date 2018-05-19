import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormDialog } from '../components/Dialogs';

// ui containers
import TaskInfoContainer from './TaskInfoContainer';

// constants
import * as apiTypes from '../constants/apiTypes';
import { STATUS_MAP, TIME_UNITS_MAP } from '../constants';

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
    // filter out empty string and array
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

  render() {
    const { taskEditorOpen } = this.props.dialogManager;
    const { pending } = this.props.taskManager;
    const { toggleTaskEditor } = this.props.actions;
    return (
      <FormDialog
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
