import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { FormDialog } from '../components/Dialogs';
import { toggleTaskAppCreator } from '../actions/dialogActions';
import { updateMessage } from '../actions/snackbarActions';
import { createTaskApp, uploadTaskApp, updateTaskApp } from '../utils/api';
import TaskSelectContainer from '../containers/TaskSelectContainer';

class TaskAppCreatorDialogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      tid: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.taskAppCreatorOpen !== this.props.taskAppCreatorOpen) {
      this.setState({
        name: '',
        description: '',
        tid: '',
      });
    }
  }

  handleValueChange = key => (e) => {
    this.setState({
      [key]: e.target.value,
    });
  }

  createTaskApp = () => {
    const { showSnackMessage } = this.props;
    const { name, description, tid } = this.state;
    const payload = { name, description };
    return createTaskApp(payload)
      .then((data) => {
        showSnackMessage('You have successfully create an app');
        if (tid !== '') {
          return uploadTaskApp(data.task_app.app_id, { tid }).then(() => showSnackMessage('You have successfully upload a task'));
        }
        return true;
      })
      .catch((e) => {
        console.log(e);
        showSnackMessage('Network Error');
      });
  }

  updateTaskApp = () => {
    const { appId, showSnackMessage } = this.props;
    const { name, description, tid } = this.state;
    const payload = { name, description };
    updateTaskApp(appId, payload)
      .then(data => uploadTaskApp(data.task_app.app_id, { tid })
        .then(() => showSnackMessage('You have successfully update an app')))
      .catch((e) => {
        console.log(e);
        showSnackMessage('Network Error');
      });
  }

  handleTaskAppSave = () => {
    const { appId } = this.props;
    if (!appId) {
      return this.createTaskApp();
    }
    return this.updateTaskApp();
  }

  render() {
    const { taskAppCreatorOpen, toggleTaskAppCreatorFunction } = this.props;
    const { name, description, tid } = this.state;
    return (
      <FormDialog
        title="Create Task App"
        openState={taskAppCreatorOpen}
        toggle={toggleTaskAppCreatorFunction}
        onSave={this.handleTaskAppSave}
        loading={false}
      >
        <form style={{
          width: 300,
          margin: '0.5em 1em',
        }}
        >
          <TextField
            id="name"
            label="name"
            value={name}
            style={{
              marginBottom: '0.5em',
            }}
            onChange={this.handleValueChange('name')}
            fullWidth
          />
          <TextField id="description" label="description" value={description} onChange={this.handleValueChange('description')} fullWidth />
          <TaskSelectContainer currentTaskId={tid} handleSelectChange={this.handleValueChange('tid')} />
        </form>

      </FormDialog>);
  }
}

const mapStateToProps = ({ dialogManager }) => {
  const { taskAppCreatorOpen } = dialogManager;
  return {
    taskAppCreatorOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleTaskAppCreatorFunction: () => dispatch(toggleTaskAppCreator()),
  showSnackMessage: message => dispatch(updateMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskAppCreatorDialogContainer);
