import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { FormDialog } from '../components/Dialogs';
import { toggleTaskAppCreator } from '../actions/dialogActions';
import { updateMessage } from '../actions/snackbarActions';
import { createTaskApp } from '../utils/api';

class TaskAppCreatorDialogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.taskAppCreatorOpen !== this.props.taskAppCreatorOpen) {
      this.setState({
        name: '',
        description: '',
      });
    }
  }

  handleValueChange = key => (e) => {
    this.setState({
      [key]: e.target.value,
    });
  }


  handleTaskAppSave = () => {
    const { showSnackMessage } = this.props;
    const payload = { ...this.state };
    return createTaskApp(payload)
      .then((success) => {
        if (success) showSnackMessage('You have successfully create an app');
        else showSnackMessage('Network Error');
      })
      .catch((e) => {
        console.log(e);
        showSnackMessage('Network Error');
      });
  }
  render() {
    const { taskAppCreatorOpen, toggleTaskAppCreatorFunction } = this.props;
    const { name, description } = this.state;
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
