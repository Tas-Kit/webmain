import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { PureDisplayDialog } from '../components/Dialogs';
import { toggleTaskAppCreator } from '../actions/dialogActions';
import { updateMessage } from '../actions/snackbarActions';
import { createTaskApp, uploadTaskApp, updateTaskApp } from '../utils/api';
import TaskSelectContainer from '../containers/TaskSelectContainer';
import LoadingButton from '../components/Button/LoadingButton';

class TaskAppCreatorDialogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      tid: '',
      isInfoLoading: false,
      isTaskLoading: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { currentApp, taskAppCreatorOpen } = this.props;
    if (prevProps.taskAppCreatorOpen !== taskAppCreatorOpen) {
      if (!this.props.taskAppCreatorOpen) {
        this.setState({
          name: '',
          description: '',
          tid: '',
          isInfoLoading: false,
          isTaskLoading: false,
        });
      } else if (currentApp) {
        this.setState({
          name: currentApp.name,
          description: currentApp.description,
          tid: currentApp.current_task,
          isInfoLoading: false,
          isTaskLoading: false,
        });
      }
    }
  }

  handleValueChange = key => (e) => {
    this.setState({
      [key]: e.target.value,
    });
  }

  createTaskApp = () => {
    const { showSnackMessage, toggleTaskAppCreatorFunction } = this.props;
    const { name, description } = this.state;
    const payload = { name, description };
    return createTaskApp(payload)
      .then(() => {
        showSnackMessage('You have successfully create a task');
        toggleTaskAppCreatorFunction();
      })
      .catch((e) => {
        console.log(e);
        showSnackMessage('Network Error');
      });
  }

  updateTaskApp = () => {
    const { appId, showSnackMessage } = this.props;
    const { name, description } = this.state;
    const payload = { name, description };
    return updateTaskApp(appId, payload)
      .then(() => showSnackMessage('You have successfully update task'))
      .catch((e) => {
        console.log(e);
        showSnackMessage('Network Error');
      });
  }

  uploadTask = () => {
    const { appId, showSnackMessage } = this.props;
    const { tid } = this.state;
    this.setState({
      isTaskLoading: true,
    });
    return uploadTaskApp(appId, { tid })
      .then(() => showSnackMessage('You have successfully upload a task'))
      .catch((e) => {
        console.log(e);
        showSnackMessage('Network Error');
      })
      .finally(() => {
        this.setState({
          isTaskLoading: false,
        });
      });
  }

  handleTaskAppSave = () => {
    const { appId } = this.props;
    let output = null;
    this.setState({
      isInfoLoading: true,
    });
    if (!appId) {
      output = this.createTaskApp();
    } else {
      output = this.updateTaskApp();
    }
    return output.finally(() => {
      this.setState({
        isInfoLoading: false,
      });
    });
  }

  render() {
    const { taskAppCreatorOpen, toggleTaskAppCreatorFunction, appId } = this.props;
    const {
      name, description, tid, isInfoLoading, isTaskLoading,
    } = this.state;
    return (
      <PureDisplayDialog
        title={appId ? 'Update Task App' : 'Create Task App'}
        open={taskAppCreatorOpen}
        toggle={toggleTaskAppCreatorFunction}
        fullWidth={false}
      >
        <section key="info-form">
          <h3>Info</h3>
          <form
            style={{
              marginBottom: '1em',
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
            <TextField
              id="description"
              label="description"
              value={description}
              style={{
                marginBottom: '0.5em',
              }}
              onChange={this.handleValueChange('description')}
              fullWidth
            />
            <LoadingButton
              buttonName={<FormattedMessage id="saveButton" />}
              color="primary"
              loading={isInfoLoading}
              onClick={this.handleTaskAppSave}
              variant="raised"
            />
          </form>

        </section>
        {
          appId && (
            <section key="task-form">
              <h3>Task</h3>
              <form
                style={{
                  display: 'flex',
                }}
              >
                <TaskSelectContainer style={{ flex: 1 }} currentTaskId={tid} handleSelectChange={this.handleValueChange('tid')} />
                <LoadingButton
                  buttonName="Upload Task"
                  color="primary"
                  loading={isTaskLoading}
                  onClick={this.uploadTask}
                  variant="flat"
                />
              </form>

            </section>
          )
        }


      </PureDisplayDialog>);
  }
}

const mapStateToProps = ({ dialogManager, taskAppManager }) => {
  const { taskAppCreatorOpen, taskAppUpdateId: appId } = dialogManager;
  const { taskApps } = taskAppManager;
  return {
    taskAppCreatorOpen,
    appId,
    currentApp: taskApps[appId],
  };
};

const mapDispatchToProps = dispatch => ({
  toggleTaskAppCreatorFunction: () => dispatch(toggleTaskAppCreator()),
  showSnackMessage: message => dispatch(updateMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskAppCreatorDialogContainer);
